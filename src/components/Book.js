import React from 'react';
import PropTypes from 'prop-types';

class Book extends React.Component {
  
  render() {
    const { bookInfo } = this.props;
    return (
      <li className="book">{bookInfo.title} by {bookInfo.author}, {bookInfo.pubDate}</li>
    )
  }
}

Book.propTypes = {
  bookInfo: PropTypes.object.isRequired
};

export default Book;
