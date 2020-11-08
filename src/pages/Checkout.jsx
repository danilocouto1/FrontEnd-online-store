import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Product from '../components/Product';

class Checkout extends Component {
  render() {
    const states = ["", "AC", "AL", "AM", "AP", "BA", "CE", "DF", "ES",
      "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI",
      "RJ", "RN", "RO", "RS", "RR", "SC", "SE", "SP", "TO"];
    const { cleanState, handleCartItems, saveDetails, removeItem, cart: { products, totalPrice } } = this.props;
    const price = (totalPrice) ? totalPrice : 0;
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
        <div>{`Total da compra: R$ ${price}`}</div>
        <form>
          <fieldset>
            <legend>Informações do Comprador</legend>
            <input id="input-name" type="text" placeholder="Nome Completo" data-testid="checkout-fullname" />
            <input id="input-cpf" type="text" placeholder="CPF" data-testid="checkout-cpf" />
            <input id="input-email" type="text" placeholder="Email" data-testid="checkout-email" />
            <input id="input-phone" type="text" placeholder="Telefone" data-testid="checkout-phone" />
            <input id="input-cep" type="text" placeholder="CEP" data-testid="checkout-cep" />
            <input id="input-address" type="text" placeholder="Endereço" data-testid="checkout-address" />
            <input id="input-other" type="text" placeholder="Complemento" />
            <input id="input-number" type="text" placeholder="Número" />
            <input id="input-city" type="text" placeholder="Cidade" />
            <select id="input-state">
              {states.map((state) => <option value={state}>{state}</option>)}
            </select>
          </fieldset>
          <fieldset>
            <legend>Pagamento</legend>
            <label className="payment">
              Boleto
              <input type="radio" name="payment-option" />
            </label>
            <label className="payment">
              VISA
              <input type="radio" name="payment-option" />
            </label>
            <label className="payment">
              MASTER CARD
              <input type="radio" name="payment-option" />
            </label>
            <label className="payment">
              ELO
              <input type="radio" name="payment-option" />
            </label>
          </fieldset>
        <Link to="/"><button onClick={cleanState}>Comprar</button></Link>
        </form>
        <Link to="/">Voltar para a Home</Link>
      </div>
    );
  }
}

export default Checkout;