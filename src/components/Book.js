import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

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
      </div>
    )
  }
}

Book.propTypes = {
  bookInfo: PropTypes.object.isRequired,
  addNewBook: PropTypes.func,
  showBookMenuMoveList: PropTypes.bool,
  showBookMenu: PropTypes.object
};

export default Book;
