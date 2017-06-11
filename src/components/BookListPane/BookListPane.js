import React from 'react';
import './BookListPane.css';

class BookListPane extends React.Component {
  render() {
    return (
      <div className="app-book-list-pane">
        <ul className="app-book-list">
          <li className="book">Title, Author, Pub date</li>
          <li className="book">Title, Author, Pub date</li>
          <li className="book">Title, Author, Pub date</li>
          <li className="book">Title, Author, Pub date</li>
          <li className="book">Title, Author, Pub date</li>
          <li className="book">Title, Author, Pub date</li>
        </ul>
      </div>
    )
  }
}

export default BookListPane;
