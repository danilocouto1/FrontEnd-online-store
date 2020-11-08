import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Product from '../components/Product';

class Cart extends Component {
  render() {
    const { handleCartItems, saveDetails, removeItem, cart: { products} } = this.props;

    return (
      <div className="cart-product">
        {(products && products.length > 0)
          ? products.map((product) => <Product
            saveDetails={ saveDetails }
            removeItem={removeItem}
            handleCartItems={handleCartItems}
            bt="cart"
            key={ product.id }
            data={ product }
          />)
          : <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>}
        <Link to="/">Voltar para a Home</Link>
        <Link to="/checkout" data-testid="checkout-products">Finalizar a compra</Link>
      </div>
    );
  }
}

export default Cart;
