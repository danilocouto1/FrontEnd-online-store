import React from 'react';
import { Switch, Route } from 'react-router';
import Home from '../pages/Home';
import Cart from '../pages/Cart';
import ProductDetails from '../components/ProductDetails';

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/products/:id" component={ ProductDetails } />
        <Route path="/cart" component={ Cart } />
        <Route exact path="/" component={ Home } />
      </Switch>
    );
  }
}
export default Routes;
