import React from 'react';
import MoveIcon from './svg/Move';
import SideList from './SideList';
import PropTypes from 'prop-types';

class MoveBookBtn extends React.Component {

  componentDidUpdate() {
    this.setMoveBtnWidth();
  }
  
  setMoveBtnWidth = () => {
    if(this.btnText.offsetHeight > 40) {
      let text = this.btnText.textContent;
      text = text.substr(0, 11).concat('...');
      this.btnText.textContent = text;
    }
  };
  
  render() {
    const showClass = this.props.showList.isActive ? " show-list" : "";

    return (
      <div className={`book-view-btns${showClass}`}>
        <div className="btn-wrapper-move" onClick={() => this.props.toggleSideList(this.props.index)}>  
          <div className="add-book-btn on-search">
            <span ref={(node) => this.btnText = node}>{this.props.bookInfo.list}</span>
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
          listTitle="Move To..."
          index={this.props.index}/>
      </div>
    )
  }
};

MoveBookBtn.propTypes = {
  moveBook: PropTypes.func.isRequired,
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

export default MoveBookBtn;
