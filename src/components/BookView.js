import React from 'react';
import PropTypes from 'prop-types';

import AddBookBtn from './AddBookBtn';
import MoveBookBtn from './MoveBookBtn';

class BookView extends React.Component {
  
  componentWillMount() {
    if(!this.props.location.bookInfo) return;
    this.props.setBookView(this.props.location.bookInfo);
  }
  
  componentWillUnmount() {
    if(this.props.showList) {
      this.props.toggleSideList();
    }
  }
  
  remove = (list, id) => {
    this.props.removeBook(list, id);
    if(this.props.location.bookInfo) {
      this.props.location.bookInfo.list = null;
    }
  };
  
  renderBtns = () => {
    const bookInfo = this.props.location.bookInfo || this.props.bookInfo;
    if(this.props.doesBookExist(this.props.bookID)) {
      return (
        <div className="book-view-btns">
          <MoveBookBtn
            bookInfo={bookInfo} 
            moveBook={this.props.moveBook}
            getAllLists={this.props.getAllLists}
            showList={this.props.showList}
            toggleSideList={this.props.toggleSideList}/>
          
          <button onClick={() => this.remove(bookInfo.list, bookInfo.id)}>Remove</button>
        </div>
      )
    } else {
      return (
        <AddBookBtn 
          bookInfo={bookInfo} 
          addNewBook={this.props.addNewBook}
          getAllLists={this.props.getAllLists}
          showList={this.props.showList}
          toggleSideList={this.props.toggleSideList}/>
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
  toggleSideList: PropTypes.func.isRequired,
  removeBook: PropTypes.func.isRequired,
  moveBook: PropTypes.func.isRequired,
  showList: PropTypes.bool.isRequired,
  bookInfo: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool
  ])
};

export default BookView;
