import React from 'react';
import PropTypes from 'prop-types';

import AddBookBtn from './AddBookBtn';

class BookView extends React.Component {
  
  componentWillMount() {
    if(!this.props.location.bookInfo) return;
    this.props.setBookView(this.props.location.bookInfo);
  }
  
  renderBtns = () => {
    const bookInfo = this.props.location.bookInfo || this.props.bookInfo;
    if(this.props.doesBookExist(this.props.bookID)) {
      return (
        <div className="book-view-btns">
          <button>Move To</button>
          <button>Remove</button>
        </div>
      )
    } else {
      return (
        <AddBookBtn bookInfo={bookInfo} addNewBook={this.props.addNewBook}/>
      )
    }
  };
  
  render() {
    const bookInfo = this.props.location.bookInfo || this.props.bookInfo;
    return (
      <div className="book-view-wrapper">
        <img src={bookInfo.img} alt="book cover" className="book-view-cover"/>
        <div className="book-view-title">{bookInfo.title}</div>
        <div className="book-view-author">{bookInfo.author}</div>
        <p className="book-view-desc">{bookInfo.desc}</p>
        {this.renderBtns()}
      </div>
    )
  }
}

BookView.propTypes = {
  bookID: PropTypes.string.isRequired,
  setBookView: PropTypes.func.isRequired,
  doesBookExist: PropTypes.func.isRequired,
  addNewBook: PropTypes.func.isRequired,
  bookInfo: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool
  ])
};

export default BookView;
