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
    const posClass = this.props.fixList ? " list-picker-fixed" : "";

    return (
      <div className={`app-book-list-pane${posClass}`}>
        <h1 className="list-title">{this.props.currentList.listName}</h1>
        <ul className="app-book-list">
          {this.renderList()}
        </ul>
      </div>
    )
  }
}

BookListPane.propTypes = {
  currentList: PropTypes.object.isRequired,
  fixList: PropTypes.bool.isRequired
};

export default BookListPane;
