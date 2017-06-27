import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

class BookListPane extends React.Component {
  
  renderBook = (bookId) => {
    if(!this.props.currentList.books[bookId]) return;
    return <Book key={bookId} bookInfo={this.props.currentList.books[bookId]}/>;
  };
  
  render() {
    const { currentList } = this.props;
    currentList.books = currentList.books || {};
    return (
      <div className="app-book-list-pane">
        <ul className="app-book-list">
          {
            Object
              .keys(currentList.books)
              .map(bookId => this.renderBook(bookId))
          }
        </ul>
      </div>
    )
  }
}

BookListPane.propTypes = {
  currentList: PropTypes.object.isRequired,
  addBook: PropTypes.func.isRequired
};

export default BookListPane;
