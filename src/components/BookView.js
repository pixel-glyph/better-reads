import React from 'react';
import PropTypes from 'prop-types';

class BookView extends React.Component {
  render() {
    return(
      <div>
        <img src="" alt="book cover"/>
        <div>{this.props.match.params.id}</div>
      </div>
    )
  }
}

export default BookView;
