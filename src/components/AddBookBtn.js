import React from 'react';
import PlusIcon from './svg/Plus';
import SideList from './SideList';
import PropTypes from 'prop-types';

class AddBookBtn extends React.Component {
  
  addBook = (listName, newBook) => {
    this.props.addNewBook(listName, newBook);
    if(this.props.syncBookView) {
      this.props.syncBookView();
    }
  };
  
  render() {
    return (
      <div className="book-view-btns">
        <span className="btn-wrapper-add">  
          <div 
            className="add-book-btn on-search" 
            onClick={() => this.addBook('Want to Read', this.props.bookInfo)}>
            <span>Want to Read</span>
          </div>
          <div className="btn-icon-wrapper" onClick={() => this.props.toggleSideList(this.props.index)}>
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
          listTitle="Add To..."
          index={this.props.index}/>
      </div>
    )
  }
};

AddBookBtn.propTypes = {
  addNewBook: PropTypes.func.isRequired,
  getAllLists: PropTypes.func.isRequired,
  toggleSideList: PropTypes.func.isRequired,
  showList: PropTypes.object.isRequired,
  syncBookView: PropTypes.func,
  index: PropTypes.number,
  bookInfo: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool
  ])
};

export default AddBookBtn;
