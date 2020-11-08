import React from 'react';

class AddCartButton extends React.Component {
  constructor() {
    super();
    this.cartStateSave = this.cartStateSave.bind(this);
    this.btRemove = this.btRemove.bind(this)
  }
         
  cartStateSave(op) {
    const { data, handleCartItems } = this.props;
    handleCartItems(data, op);
  }

  btHome() {
    const { bt, data, handleCartItems } = this.props;
    let testid;
    if (bt === 'home') testid = 'product-add-to-cart';
    if (bt === 'productDetails') testid = 'product-detail-add-to-cart';
    let disabled = false;
    if (data.aqtd === data.available_quantity) disabled = true;
    return (
      <div id="cart-button">
        <button
          data-testid={ testid }
          type="button"
          onClick={ () => handleCartItems(data, 'plus') }
          disabled={disabled}
        >
          Adicionar ao Carrinho de Compras
        </button>
      </div>
    );
  }

  removeButton() {
    const { data, removeItem } = this.props;
    return (
      <button data-testid="product-add-to-cart" type="button" onClick={ (event) => removeItem(data.id) }>
        Remover
      </button>
    );
  }

  btRemove() {
    const { data, handleCartItems, showBtRemove } = this.props;
    let disabled = false;
    if (data.aqtd === data.available_quantity) disabled = true;
    return (
      <div id="cart-button">
        <div>
          Quantidade:
          <div data-testid="shopping-cart-product-quantity"> 
            {(data.aqtd) ? data.aqtd : 0}
          </div>
        </div>
        <button disabled={disabled} id="bt-plus" data-testid="product-increase-quantity" type="button" onClick={ () => handleCartItems(data, 'plus') }>
          +
        </button>
        <button data-testid="product-decrease-quantity" type="button" onClick={ () => handleCartItems(data, 'minus') }>
          -
        </button>
        {(showBtRemove) ? this.removeButton() : null}
      </div>
    );
  }

  render() {
    const { bt, data } = this.props;
    return (
      <div>
        {(bt === 'cart') ? this.btRemove() : this.btHome()}
      </div>
    );
  }
}

export default AddCartButton;
