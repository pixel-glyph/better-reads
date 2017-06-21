import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

class BookListPane extends React.Component {
  
  render() {
    const { currentList } = this.props;
    return (
      <div className="app-book-list-pane">
        <ul className="app-book-list">
          {
            Object
              .keys(currentList.books)
              .map(bookId => <Book key={bookId} bookInfo={currentList.books[bookId]}/>)
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
