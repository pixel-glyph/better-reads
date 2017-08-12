import React from 'react';
import MoveIcon from './svg/Move';
import SideList from './SideList';
import PropTypes from 'prop-types';

class MoveBookBtn extends React.Component {
  
  render() {
    return (
      <div className="book-view-btns">
        <div className="btn-wrapper" onClick={() => this.props.toggleSideList()}>  
          <div className="add-book-btn on-search">
            <span>{this.props.bookInfo.list}</span>
          </div>
          <div className="btn-icon-wrapper">
            <MoveIcon/>
          </div>
        </div>
        <SideList 
          getAllLists={this.props.getAllLists} 
          showList={this.props.showList} 
          listMethod={this.props.moveBook}
          bookInfo={this.props.bookInfo}
          toggleSideList={this.props.toggleSideList}
          syncBookView={this.props.syncBookView}
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
  syncBookView: PropTypes.func,
  bookInfo: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool
  ])
};

export default MoveBookBtn;
