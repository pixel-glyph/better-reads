import React from 'react';
import PropTypes from 'prop-types';
import Overlay from './Overlay';

class SideList extends React.Component {
  
  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }
  
  handleClickOutside = (e) => {
    if(
      this.props.showList.isActive && 
      this.sideListRef && 
      !this.sideListRef.contains(e.target) && 
      this.props.index === this.props.showList.index
    ) {
      this.props.toggleSideList();
    }
  };
  
  listSelect = (e, book) => {
    const list = e.target.textContent;
    this.props.toggleSideList();
    this.props.listMethod(list, book, book.id);
    if(this.props.syncBookView) {
      this.props.syncBookView();
    }
  };
  
  render() {
    const { showList, bookInfo, index } = this.props;
    const showClass = (index === undefined && showList.isActive) || (showList.isActive && showList.index === index)
      ? " show-list" 
      : "";
    
    return (
      <div ref={(node) => this.sideListRef = node}>
        <div className={`add-list-select${showClass}`}>
          <ul className="list-names">
            <li className="list-title">{this.props.listTitle}</li>
            {
              this.props.getAllLists(bookInfo.list).map((list, i) => {
                return <li className="list-name" key={i} onClick={(e) => this.listSelect(e, bookInfo)}>{list}</li>
              })
            }
          </ul>
        </div>
        <Overlay 
          toggle={this.props.toggleSideList} 
          showOverlay={showList.isActive}/>
      </div>
    )
  }
};

SideList.propTypes = {
  showList: PropTypes.object.isRequired,
  getAllLists: PropTypes.func.isRequired,
  listMethod: PropTypes.func.isRequired,
  toggleSideList: PropTypes.func.isRequired,
  listTitle: PropTypes.string.isRequired,
  syncBookView: PropTypes.func,
  index: PropTypes.number,
  bookInfo: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool
  ])
};

export default SideList;
