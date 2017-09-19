import React from 'react';
import PropTypes from 'prop-types';

import Remove from './svg/Remove';

class BookList extends React.Component {  
  switchListSelect = (list) => {
    if(this.props.onMobile) {
      this.props.toggleSideList();
    }
    this.props.switchList(list);
  };
  
  removeList = (e) => {
    e.stopPropagation();
    let parentElem = e.target.parentNode;
    while(!parentElem.classList.contains("list-picker-remove-icon")) {
      parentElem = parentElem.parentNode;
    }
    const listToRemove = parentElem.previousSibling.firstChild.textContent.trim();
    this.props.removeListHandler(listToRemove);
  };
  
  render() {
    const { listDisplayName, listName, lists, onMobile } = this.props;
    const selectedClass = !onMobile && lists[listName] && lists[listName].selected ? " selected" : "";
    
    return (
      <li className={`list-name${selectedClass}`} onClick={() => this.switchListSelect(listName)}>
        <div className="list-name-text">
          <span>{listDisplayName} </span>
          <span>({this.props.numBooks})</span>
        </div>
        {!onMobile && listDisplayName !== "To Read" && listDisplayName !== "Read"
          ? <div className="list-picker-remove-icon" onClick={(e) => this.removeList(e)}>
              <Remove/>
            </div>
          : null
        }
      </li>
    )
  }
}

BookList.propTypes = {
  listName: PropTypes.string.isRequired,
  listDisplayName: PropTypes.string.isRequired,
  numBooks: PropTypes.number.isRequired,
  toggleSideList: PropTypes.func.isRequired,
  switchList: PropTypes.func.isRequired,
  removeListHandler: PropTypes.func,
  onMobile: PropTypes.bool,
  lists: PropTypes.object
};

export default BookList;
