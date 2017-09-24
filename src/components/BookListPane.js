import React from 'react';
import PropTypes from 'prop-types';

import Book from './Book';
import Menu from './svg/Menu';


class BookListPane extends React.Component {
  
  renderBook = (bookId, i) => {
    if(!this.props.currentList.books[bookId]) return;
    return (
      <li className="book-wrapper" key={bookId}>
        <Book bookInfo={this.props.currentList.books[bookId]}/>
        <div onClick={() => this.props.toggleBookMenu(i)}>
          <Menu index={i} showBookMenu={this.props.showBookMenu}/>
        </div>
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
      .map((bookId, i) => this.renderBook(bookId, i));
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
  toggleBookMenu: PropTypes.func.isRequired,  
  fixList: PropTypes.bool.isRequired,
  showBookMenu: PropTypes.object.isRequired
};

export default BookListPane;
