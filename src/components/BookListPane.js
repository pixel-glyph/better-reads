import React from 'react';
import Book from './Book';

class BookListPane extends React.Component {
  render() {
    return (
      <div className="app-book-list-pane">
        <ul className="app-book-list">
          <Book/>
        </ul>
      </div>
    )
  }
}

export default BookListPane;
