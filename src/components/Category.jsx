import React from 'react';
import PropTypes from 'prop-types';

class Category extends React.Component {
  render() {
    const { data } = this.props;
    const { handleEventChecked, checkedId } = this.props;
    const check = (checkedId === data.id) ? true : false 

    return (
      <div className="radio" >
        <label htmlFor={ data.id }>
          <input
            id={ data.id }
            type="radio"
            name="categories"
            data-testid="category"
            value={ data.id }
            onChange={ handleEventChecked }
            checked={check}
          />
          {data.name}
        </label>
      </div>
    );
  }
}

Category.propTypes = { data: PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
}).isRequired };

export default Category;
