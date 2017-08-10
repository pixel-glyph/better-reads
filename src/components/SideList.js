import React from 'react';
import PropTypes from 'prop-types';
import Overlay from './Overlay';

class SideList extends React.Component {  
  listSelect = (e, book) => {
    this.props.toggleSideList();
    
    const list = e.target.textContent;
    this.props.listMethod(list, book, book.id);
    this.props.syncBookView();
  };
  
  render() {
    const { showList, bookInfo } = this.props;
    const showClass = showList ? " show-list" : "";
    
    return (
      <div>
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
          toggleSideList={this.props.toggleSideList} 
          showList={this.props.showList}/>
      </div>
    )
  }
};

SideList.propTypes = {
  showList: PropTypes.bool.isRequired,
  getAllLists: PropTypes.func.isRequired,
  listMethod: PropTypes.func.isRequired,
  toggleSideList: PropTypes.func.isRequired,
  listTitle: PropTypes.string.isRequired,
  syncBookView: PropTypes.func.isRequired,
  bookInfo: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool
  ])
};

export default SideList;
