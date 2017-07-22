import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Book extends React.Component {
  
  render() {
    const { bookInfo } = this.props;
    return (
      <li className="book">
        <Link to={`/book/${bookInfo.id}`}><img className="book-thumbnail-img" src={bookInfo.img} alt="book cover"/></Link>
        <div className="book-title-author">
          <p><Link to={`/book/${bookInfo.id}`}>{bookInfo.title}</Link></p>
          <p className="book-author">by {bookInfo.author}, {bookInfo.pubDate}</p>
        </div>
        <button className="add-book-btn on-search" onClick={() => this.props.addBook('To Read', bookInfo)}>Add Book</button>
      </li>
    )
  }
}

Book.propTypes = {
  bookInfo: PropTypes.object.isRequired,
  addBook: PropTypes.func
};

export default Book;
