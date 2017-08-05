import React from 'react';
import PlusIcon from './svg/Plus';
import SideList from './SideList';
import PropTypes from 'prop-types';

class MoveBookBtn extends React.Component {
  
  render() {
    return (
      <div className="book-view-btns">
        <div className="add-book-btn-wrapper" onClick={() => this.props.toggleSideList()}>  
          <div className="add-book-btn on-search">
            <span>{this.props.bookInfo.list}</span>
          </div>
          <div className="btn-icon-wrapper">
            <PlusIcon/>
          </div>
        </div>
        <SideList 
          getAllLists={this.props.getAllLists} 
          showList={this.props.showList} 
          listMethod={this.props.moveBook}
          bookInfo={this.props.bookInfo}
          toggleSideList={this.props.toggleSideList}
          listTitle="Move To..."/>
      </div>
    )
  }
};

MoveBookBtn.propTypes = {
  moveBook: PropTypes.func.isRequired,
  getAllLists: PropTypes.func.isRequired,
  toggleSideList: PropTypes.func.isRequired,
  showList: PropTypes.bool.isRequired,
  bookInfo: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool
  ])
};

export default MoveBookBtn;
