import React from 'react';
import PropTypes from 'prop-types';

class BookView extends React.Component {
  
  componentWillMount() {
    if(!this.props.location.bookInfo) return;
    this.props.setBookView(this.props.location.bookInfo);
  }
  
  render() {
    const bookInfo = this.props.location.bookInfo || this.props.bookInfo;
    return (
      <div className="book-view-wrapper">
        <img src={bookInfo.img} alt="book cover"/>
        <div>{this.props.bookID}</div>
      </div>
    )
  }
}

BookView.propTypes = {
  bookID: PropTypes.string.isRequired,
  setBookView: PropTypes.func.isRequired,
  // bookInfo: PropTypes.object
};

export default BookView;
