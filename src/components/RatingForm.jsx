import React from 'react';
import Stars from './Stars';

class RatingForm extends React.Component {
  constructor() {
    super() 
    this.submit = this.submit.bind(this)
  }

  submit(id) {
    const { ratingSubmit } = this.props;
    const email = document.querySelector('#rating-email').value;
    const msg = document.querySelector('#rating-msg').value;
    const stars = 4;
    ratingSubmit({ id, email, msg, stars });
  }

  render() {
    const { productDetails } = this.props;
    return (
      <fieldset label="Avaliações">
        <legend>Avaliações</legend>
        <form>
          <input id="rating-email" placeholder="E-mail" type="text" required="required" />
          <Stars />
          <textarea id="rating-msg" placeholder="Mensagem (Opcional)" data-testid="product-detail-evaluation" type="text" />
          <button type="button" onClick={ () => this.submit(productDetails.id) }>Avaliar</button>
        </form>
      </fieldset>
    );
  }
}

export default RatingForm;