import React from 'react';
import * as api from '../services/api';
import Category from './Category';

class Categories extends React.Component {
  constructor() {
    super();

    this.fetchCategories = this.fetchCategories.bind(this);

    this.state = {
      data: null,
    };
  }

  componentDidMount() {
    this.fetchCategories();
  }

  async fetchCategories() {
    const fetchData = await api.getCategories();
    this.setState({ data: fetchData });
  }

  render() {
    const { data } = this.state;
    const { handleEventChecked, checkedId } = this.props;
    
    return (
      <aside className="categories">
        <h4 className="titleCategories">Categorias:</h4>
        <form>
          {(data === null)
            ? 'Loading...'
            : data.map((category) => <Category 
              checkedId={checkedId}
              key={ category.id }
              data={ category }
              handleEventChecked={ handleEventChecked }
            />)}
        </form>
      </aside>
    );
  }
}

export default Categories;
