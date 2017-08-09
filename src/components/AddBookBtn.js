import React from 'react';
import PlusIcon from './svg/Plus';
import SideList from './SideList';
import PropTypes from 'prop-types';

class AddBookBtn extends React.Component {
  
  addBook = (listName, newBook) => {
    this.props.toggleSideList();
    this.props.addNewBook(listName, newBook);
    this.props.syncBookView();
  };
  
  render() {
    return (
      <div className="book-view-btns">
        <span className="add-book-btn-wrapper">  
          <div 
            className="add-book-btn on-search" 
            onClick={() => this.addBook('To Read', this.props.bookInfo)}>
            <span>To Read</span>
          </div>
          <div className="btn-icon-wrapper" onClick={() => this.props.toggleSideList()}>
            <PlusIcon/>
          </div>
        </span>
        <SideList 
          getAllLists={this.props.getAllLists} 
          showList={this.props.showList} 
          listMethod={this.props.addNewBook}
          bookInfo={this.props.bookInfo}
          toggleSideList={this.props.toggleSideList}
          syncBookView={this.props.syncBookView}
          listTitle="Add To..."/>
      </div>
    )
  }
};

AddBookBtn.propTypes = {
  addNewBook: PropTypes.func.isRequired,
  getAllLists: PropTypes.func.isRequired,
  toggleSideList: PropTypes.func.isRequired,
  showList: PropTypes.bool.isRequired,
  syncBookView: PropTypes.func.isRequired,
  bookInfo: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool
  ])
};

export default AddBookBtn;
