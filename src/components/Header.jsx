import React, { Component } from 'react';
import { FaSearch } from 'react-icons/fa';
import CartButton from './CartButton';
import mercadolivre from '../img/mercadolivre.png';
import quindimlogo from '../img/quindimshop.png';


class Header extends Component {
  render() {
    const { inputValue, handleEvent, onClick, cart } = this.props;
    return (
      <div className="header">
        <img id="logo-quindim-header" alt="logomarca quindim shop" src={ quindimlogo } />
        <div id="box">
          <input id="box-search" onChange={ handleEvent } value={ inputValue } data-testid="query-input" type="text" placeholder="Buscar produtos, marcas e muito mais..." />
          <button id="button-search" onClick={ onClick } data-testid="query-button" type="button">
             <FaSearch />
          </button>
          <h3 id="message-header" data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </h3>
        </div>
        <div id="logo-ml-container">
          <p id="subtitle-ml">
            Com API
            <img id="logo-ml" alt="logomarca mercado livre" src={ mercadolivre } />
          </p>
        </div>
        <CartButton cart={ cart } />
        <div id="header-bar-grey" />
        <div id="header-bar-black" />
        <div id="header-bar-yellow" />
      </div>
    );
  }
}
export default Header;
