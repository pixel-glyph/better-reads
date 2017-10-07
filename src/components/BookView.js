import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import AddBookBtn from './AddBookBtn';
import MoveBookBtn from './MoveBookBtn';
import Remove from './svg/Remove';

class BookView extends React.Component {
  
  componentWillMount() {
    this.syncBookView();
    if(this.props.showFullDesc) {
      this.props.toggleDesc();
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0);    
  }
  
  componentWillUnmount() {
    if(this.props.showList.isActive) {
      this.props.toggleSideList();
    }
  }
  
  syncBookView = () => {
    if(!this.props.location.bookInfo) return;
    this.props.setBookView(this.props.location.bookInfo);
  };
  
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
        <div className="book-view-btns-wrapper">
          <MoveBookBtn
            bookInfo={bookInfo} 
            moveBook={this.props.moveBook}
            getAllLists={this.props.getAllLists}
            showList={this.props.showList}
            toggleSideList={this.props.toggleSideList}
            syncBookView={this.syncBookView}/>
          
          <button className="remove-btn" onClick={() => this.remove(bookInfo.list, bookInfo.id)}>
            <Remove/>
            <span>Remove</span>
          </button>
        </div>
      )
    } else {
      return (
        <div className="book-view-btns-wrapper">
          <AddBookBtn 
            bookInfo={bookInfo} 
            addNewBook={this.props.addNewBook}
            getAllLists={this.props.getAllLists}
            showList={this.props.showList}
            toggleSideList={this.props.toggleSideList}
            syncBookView={this.syncBookView}/>
        </div>
      )
    }
  };
  
  renderDesc = () => {
    const bookInfo = this.props.location.bookInfo || this.props.bookInfo;
    const bookDesc = bookInfo.desc;
    const descClass = this.props.showFullDesc ? " show-full-desc" : "";
    
    if(bookDesc && bookDesc.length < 190) {
      return (
        <div className="book-view-desc">{bookDesc}</div>
      )
    } else if(bookDesc) {
      const abbrivDesc = bookDesc.slice(0, 190);  
      return (
        <div className="book-view-desc">
          <div className={`book-view-desc-short-wrapper${descClass}`}>    {/* show this be default */}
            <span className="book-view-desc-short">{abbrivDesc}</span>  
            <span className="desc-more-less" onClick={() => this.props.toggleDesc()}>...More</span>    {/* on click, show full */}
          </div>
          <div className={`book-view-desc-full-wrapper${descClass}`}>
            <span className="book-view-desc-full">{bookDesc}</span>
            <div className="desc-more-less" onClick={() => this.props.toggleDesc()}>Less</div>    {/* on click, show short */}
          </div>
        </div>
      )
    }
  };
  
  render() {
    const bookInfo = this.props.location.bookInfo || this.props.bookInfo;    
    let width = window.innerWidth;
    
    if(width < 800) {
      return (
        <div className="book-view-wrapper">
          <p className="book-view-back-link"><Link to="/">&#8592; Back to My Shelves</Link></p>
          <div className="book-view-body">
            <img src={bookInfo.img} alt="book cover" className="book-view-cover"/>
            <div className="book-view-title-author">
              <div className="book-view-title">{bookInfo.title}</div>
              <div className="book-view-author">by {bookInfo.author}</div>
            </div>
          </div>
          {this.renderDesc()}
          {this.renderBtns()}
        </div>
      )
    } else {
      return (
        <div className="book-view-wrapper">
          <p className="book-view-back-link"><Link to="/">&#8592; Back to My Shelves</Link></p>
          <div className="book-view-body">
            <img src={bookInfo.img} alt="book cover" className="book-view-cover"/>
            <div className="book-view-title-author">
              <div className="book-view-title">{bookInfo.title}</div>
              <div className="book-view-author">by {bookInfo.author}</div>
              {this.renderDesc()}
            </div>
          </div>
          {this.renderBtns()}
        </div>
      )
    }
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
  toggleDesc: PropTypes.func.isRequired,
  showFullDesc: PropTypes.bool.isRequired,
  showList: PropTypes.object.isRequired,
  bookInfo: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool
  ])
};

export default BookView;
