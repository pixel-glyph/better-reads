import React from 'react';
import PlusIcon from './svg/Plus';
import PropTypes from 'prop-types';

class AddBookBtn extends React.Component {
  
  showAddMenu = () => {
    return console.log('showing!');
  };
  
  render() {
    return (
      <div className="book-view-btns">
        <div className="add-book-btn-wrapper">  
          <div 
            className="add-book-btn on-search" 
            onClick={() => this.props.addNewBook('To Read', this.props.bookInfo)}>
            <span>To Read</span>
          </div>
          <div className="btn-icon-wrapper" onClick={() => this.showAddMenu()}>
            <PlusIcon/>
          </div>
        </div>
      </div>
    )
  }
};

AddBookBtn.propTypes = {
  addNewBook: PropTypes.func.isRequired,
  bookInfo: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool
  ])
};

export default AddBookBtn;
