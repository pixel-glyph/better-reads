import React from 'react';
import PlusIcon from './svg/Plus';
import PropTypes from 'prop-types';

class AddBookBtn extends React.Component {
  
  showAddMenu = () => {
    // add 'slide' class to add-list-select
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
        <div className="add-list-select">
          <ul>
            {
              this.props.getAllLists().map((list, i) => {
                return <li key={i}>{list}</li>
              })
            }
          </ul>
        </div>
      </div>
    )
  }
};

AddBookBtn.propTypes = {
  addNewBook: PropTypes.func.isRequired,
  getAllLists: PropTypes.func.isRequired,
  bookInfo: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool
  ])
};

export default AddBookBtn;
