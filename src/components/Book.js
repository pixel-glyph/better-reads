import React from 'react';
import PropTypes from 'prop-types';

class Book extends React.Component {
  
  render() {
    const { bookInfo } = this.props;
    return (
      <li className="book">
        <img className="book-thumbnail-img" src={bookInfo.img} alt="book cover"/>
        <div className="book-title-author">
          <p>{bookInfo.title}</p>
          <p className="book-author">by {bookInfo.author}, {bookInfo.pubDate}</p>
        </div>
        <button className="add-book-btn" onClick={() => this.props.addBook('To Read', bookInfo)}>Add Book</button>
      </li>
    )
  }
}

Book.propTypes = {
  bookInfo: PropTypes.object.isRequired,
  addBook: PropTypes.func
};

export default Book;
