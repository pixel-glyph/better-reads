import React from 'react';
import PropTypes from 'prop-types';

class Book extends React.Component {
  
  render() {
    const { bookInfo } = this.props;
    return (
      <li className="book">
        <img className="book-thumbnail-img" src="" alt="book cover"/>
        <span className="book-title-author">
          <p>{bookInfo.title}</p>
          <p className="book-author">{bookInfo.author}, {bookInfo.pubDate}</p>
        </span>
      </li>
    )
  }
}

Book.propTypes = {
  bookInfo: PropTypes.object.isRequired
};

export default Book;
