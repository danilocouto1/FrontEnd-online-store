import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';

class CartButton extends React.Component {
  render() {
    const { cart } = this.props

    return (
      <div className="cart-button-container">
        <button className="cart-button" type="button">
          <Link data-testid="shopping-cart-button" to="/cart">
            <FaShoppingCart /> 
          </Link>
          <div data-testid="shopping-cart-size">{(cart) ? cart.totalQtd : 0}</div>
        </button>
      </div>
    );
  }
}

export default CartButton;
