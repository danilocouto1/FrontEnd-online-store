import React, { Component } from 'react';
import Header from '../components/Header';
import Categories from '../components/Categories';
import Products from '../components/Products';

class Home extends Component {
  render() {
    const { data, textInput, cart, handleEvent, onClick } = this.props;
    const { handleEventChecked, handleCartItems, checkedId, saveDetails  } = this.props;

    return (
      <div>
        <Header
          cart={ cart }
          inputValue={ textInput }
          handleEvent={ handleEvent } 
          onClick={ onClick }
        />
        <div className="content">
          <Categories
            checkedId={ checkedId }
            handleEventChecked={ handleEventChecked } 
          />
          <Products
            saveDetails={ saveDetails }
            handleCartItems={ handleCartItems }
            cart={ cart }
            data={ data }
          />
        </div>
      </div>
    );
  }
}

export default Home;