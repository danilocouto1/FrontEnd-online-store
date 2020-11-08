import React from 'react';

class Vote extends React.Component {
  render() {
    const { item } = this.props;
    console.log(item);
    return (
      <div>
        <h4>{item.email}</h4>
        <div>{item.stars}</div>
        <div>{item.msg}</div>
      </div>
    );
  }
}

export default Vote;