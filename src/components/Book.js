import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Book extends React.Component {
  
  hideBookMenu = () => {
    if(this.props.showBookMenuMoveList) {
      this.props.toggleBookMenuMoveList();
    }
    if(this.props.showBookMenu.isActive) {
      this.props.toggleBookMenu();
    }
  };

  render() {
    const { bookInfo } = this.props;
    return (
      <div className="book">
        <Link to={{pathname: `/book/${bookInfo.id}`, bookInfo: bookInfo}} onClick={() => this.hideBookMenu()}>
          <img className="book-thumbnail-img" src={bookInfo.img} alt="book cover"/>
        </Link>
        <div className="book-title-author">
          <p>
            <Link to={{pathname: `/book/${bookInfo.id}`, bookInfo: bookInfo}} onClick={() => this.hideBookMenu()}>
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
  toggleBookMenuMoveList: PropTypes.func,
  showBookMenuMoveList: PropTypes.bool,
  showBookMenu: PropTypes.object,  
  toggleBookMenu: PropTypes.func
};

export default Book;
