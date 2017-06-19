import React from 'react';
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

export default BookListPane;
