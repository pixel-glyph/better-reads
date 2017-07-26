import React from 'react';
import PropTypes from 'prop-types';

class BookView extends React.Component {
  
  componentWillMount() {
    if(!this.props.location.bookInfo) return;
    this.props.setBookView(this.props.location.bookInfo);
  }
  
  renderBtns = () => {
    if(this.props.doesBookExist(this.props.bookID)) {
      return (
        <button>Move To</button>
      )
    } else {
      return (
        <button>Add To</button>
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
        <div className="book-view-btns">
          {this.renderBtns()}
        </div>
      </div>
    )
  }
}

BookView.propTypes = {
  bookID: PropTypes.string.isRequired,
  setBookView: PropTypes.func.isRequired,
  doesBookExist: PropTypes.func.isRequired,
  bookInfo: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool
  ])
};

export default BookView;
