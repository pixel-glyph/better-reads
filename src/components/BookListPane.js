import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

class BookListPane extends React.Component {
  
  renderBook = (bookId) => {
    if(!this.props.currentList.books[bookId]) return;
    return (
      <li key={bookId}>
        <Book bookInfo={this.props.currentList.books[bookId]}/>
      </li>
    )
  };
  
  renderList = () => {
    const { currentList } = this.props;
    if(!currentList.books || !Object.keys(currentList.books).length) {
      return <li className="book empty-list">List is empty :(</li>;
    }
    return Object
      .keys(currentList.books)
      .map(bookId => this.renderBook(bookId));
  };
  
  render() {
    return (
      <div className="app-book-list-pane">
        <h1 className="list-title">List Title</h1>
        <ul className="app-book-list">
          {this.renderList()}
        </ul>
      </div>
    )
  }
}

BookListPane.propTypes = {
  currentList: PropTypes.object.isRequired
};

export default BookListPane;
