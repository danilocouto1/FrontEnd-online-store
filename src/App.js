import React from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Switch, Route } from 'react-router';
import Home from './pages/Home';
import Cart from './pages/Cart';
import ProductDetails from './components/ProductDetails';
import * as api from './services/api';
import Checkout from './pages/Checkout';

class App extends React.Component {
  constructor() {
    super();

    this.onClick = this.onClick.bind(this);
    this.fetchProducts = this.fetchProducts.bind(this);
    this.handleEvent = this.handleEvent.bind(this);
    this.handleEventChecked = this.handleEventChecked.bind(this);
    this.handleCartItems = this.handleCartItems.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.saveDetails = this.saveDetails.bind(this);
    this.calcQtdItems = this.calcQtdItems.bind(this);
    this.ratingSubmit = this.ratingSubmit.bind(this);
    this.cleanState = this.cleanState.bind(this);
    this.getLocalStorageItems = this.getLocalStorageItems.bind(this);

    this.state = {
      textInput: '',
      data: null,
      checkedId: null,
      productDetails: null,
      ratingProducts: [],
      initialQtd: 0,
      cart: {
        totalPrice: null,
        totalQtd: 0,
        products: [],
      },
    };
  }

  componentDidMount() {
    this.getLocalStorageItems();
  }

  componentDidUpdate() {
    localStorage.setItem('state', JSON.stringify(this.state));
  }

  onClick() {
    const { textInput: { query } } = this.state;
    if (query !== '') this.fetchProducts({ query });
  }

  getLocalStorageItems() {
    const state = JSON.parse(localStorage.getItem('state'));
    if (state) this.setState(state);
  }

  calcQtdItems(productsList) {
    const { initialQtd } = this.state;
    let qtd = initialQtd;
    productsList.forEach((product) => {
      qtd += product.aqtd;
    });
    return qtd;
  }

  addOrRemoveProduct(product, op) {
    console.log('Produto adicionado ao carrinho com sucesso!');
    const { cart: { products } } = this.state;
    let newListItems = [];
    if (products) {
      if (products.some((item) => (item.id === product.id))) {
        newListItems = products.map((item) => {
          if (item.id === product.id) {
            if (op === 'plus') {
              item.aqtd += 1;
            } else if (op === 'minus') {
              if (item.aqtd > 1) item.aqtd -= 1;
            }
            return item;
          }
          return item;
        });
        return newListItems;
      }
      return [...products, product];
    }
    return [product];
  }

  handleCartItems(product, op) {
    if (!product.aqtd) product.aqtd = 1;
    const productsUpdated = this.addOrRemoveProduct(product, op);
    const qtdItems = this.calcQtdItems(productsUpdated);
    this.setState({ cart: { products: productsUpdated, totalQtd: qtdItems } }); // totalQtd: qtdItems
  }

  removeItem(id) {
    const { cart: { products } } = this.state;
    const zeroQtd = products.filter((item) => item.id === id);
    zeroQtd[0].aqtd = 0;
    const newCartItems = products.filter((item) => item.id !== id);
    // const qtdItems = this.calcQtdItems(newCartItems);
    this.setState({ cart: { products: newCartItems } }); // totalQtd: qtdItems
  }

  saveDetails(product) {
    this.setState({ productDetails: product });
  }

  ratingSubmit({ id, email, msg, stars }) {
    const { ratingProducts } = this.state;
    const newRatingArray = [...ratingProducts, { id, email, msg, stars }];
    this.setState({ ratingProducts: newRatingArray });
  }

  handleEvent({ target }) {
    const query = target.value;
    this.setState({ textInput: query });
  }

  handleEventChecked({ target }) {
    const categoryId = target.value;
    this.setState({ checkedId: categoryId });
    this.fetchProducts({ categoryId });
  }

  cleanState() {
    this.setState({
      textInput: '',
      data: null,
      checkedId: null,
      productDetails: null,
      ratingProducts: [],
      cart: {
        totalPrice: null,
        totalQtd: 0,
        products: [],
      },
      checkout: {
        fullName: '',
        cpf: '',
        email: '',
        phone: '',
        cep: '',
        address: '',
        other: '',
        number: '',
        city: '',
        state: '',
      },
    });
  }

  async fetchProducts({ categoryId, query }) {
    const fetchData = await api.getProductsFromCategoryAndQuery({ categoryId, query });
    this.setState({ data: fetchData });
  }

  render() {
    const { data, textInput, cart, checkedId,
      productDetails, ratingProducts } = this.state;
    return (
      <Router>
        <Switch>
          <Route
            path="/products/:id"
            component={ () => (<ProductDetails
              ratingProducts={ ratingProducts }
              ratingSubmit={ this.ratingSubmit }
              cart={ cart }
              productDetails={ productDetails }
              handleCartItems={ this.handleCartItems }
            />) }
          />
          <Route
            path="/cart"
            component={ () => (<Cart
              saveDetails={ this.saveDetails }
              removeItem={ this.removeItem }
              handleCartItems={ this.handleCartItems }
              cart={ cart }
            />) }
          />
          <Route
            exact
            path="/"
            component={ () => (<Home
              cart={ cart }
              saveDetails={ this.saveDetails }
              data={ data }
              textInput={ textInput }
              handleEvent={ this.handleEvent }
              onClick={ this.onClick }
              handleCartItems={ this.handleCartItems }
              handleEventChecked={ this.handleEventChecked }
              checkedId={ checkedId }
            />) }
          />
          <Route
            path="/checkout"
            component={ () => (<Checkout
              cleanState={ this.cleanState }
              cart={ cart }
            />) }
          />
        </Switch>
      </Router>
    );
  }
}

export default App;
