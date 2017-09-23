import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Menu from './svg/Menu';

class Book extends React.Component {
  
  render() {
    const { bookInfo } = this.props;
    return (
      <div className="book">
        <Link to={{pathname: `/book/${bookInfo.id}`, bookInfo: bookInfo}}>
          <img className="book-thumbnail-img" src={bookInfo.img} alt="book cover"/>
        </Link>
        <div className="book-title-author">
          <p>
            <Link to={{pathname: `/book/${bookInfo.id}`, bookInfo: bookInfo}}>
              {bookInfo.title}
            </Link>
          </p>
          <p className="book-author">by {bookInfo.author}, {bookInfo.pubDate}</p>
        </div>
        <Menu/>
      </div>
    )
  }
}

Book.propTypes = {
  bookInfo: PropTypes.object.isRequired,
  addNewBook: PropTypes.func
};

export default Book;
