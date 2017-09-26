import React from 'react';
import PropTypes from 'prop-types';

import Remove from './svg/Remove';
import CaretRight from './svg/CaretRight';

class BookMenu extends React.Component {

  populateMoveList = () => {
    const currentListName = this.props.currentList.listName;
    const lists = this.props.getAllLists(currentListName);

    const moveLists = lists.map((list, i) => {
      return <li key={i} onClick={() => this.props.switchList(list)}>{list}</li>;
    });
    return moveLists;
  };

  render() {
    const { isActive, index } = this.props.showBookMenu;
    const showClass = isActive && index === this.props.index ? " show-menu" : "";

    return (
      <div className={`book-menu${showClass}`}>
        <div className="book-menu-arrow"></div>
        <div className="book-menu-list-wrapper">
          <ul className="book-menu-list">
            <li className="book-menu-done-reading">Done Reading</li>
            <li className="book-menu-move">
              <span>Move To</span>
              <CaretRight/>
            </li>
            <li className="book-menu-remove">
              <Remove/>
              <span> Remove Book</span>
            </li>
          </ul>
          <ul className="book-menu-move-list">
            {this.populateMoveList()}
          </ul>
        </div>
      </div>
    )
  }

}

BookMenu.propTypes = {
  showBookMenu: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  currentList: PropTypes.object.isRequired,  
  getAllLists: PropTypes.func.isRequired,
  switchList: PropTypes.func.isRequired
};

export default BookMenu;
