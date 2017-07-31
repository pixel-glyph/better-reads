import React from 'react';
import PlusIcon from './svg/Plus';
import PropTypes from 'prop-types';

const AddBookBtn = () => {
  return (
    <div className="book-view-btns">
      <div className="add-book-btn-wrapper">  
        <div 
          className="add-book-btn on-search" 
          onClick={() => this.props.addNewBook('To Read', this.props.bookInfo)}>
          <span>To Read</span>
        </div>
        <PlusIcon/>
      </div>
    </div>
  )
};

AddBookBtn.propTypes = {
  addNewBook: PropTypes.func.isRequired,
  bookInfo: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool
  ])
};

export default AddBookBtn;
