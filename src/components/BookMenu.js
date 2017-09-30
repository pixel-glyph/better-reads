import React from 'react';
import PropTypes from 'prop-types';

import Remove from './svg/Remove';
import CaretRight from './svg/CaretRight';

class BookMenu extends React.Component {

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }
  
  handleClickOutside = (e) => {
    if(
      this.props.showBookMenu.isActive && 
      this.bookMenuRef && 
      !this.bookMenuRef.contains(e.target) && 
      this.props.index === this.props.showBookMenu.index
    ) {
        if(this.showBookMenuMoveList) {
          this.toggleBookMenuMoveList();
        }
        this.props.toggleBookMenu();
      
    }
  };
  
  populateMoveList = () => {
    const currentListName = this.props.currentList.listName;
    const lists = this.props.getAllLists(currentListName);
    const { bookInfo } = this.props;

    const moveLists = lists.map((list, i) => {
      return <li key={i} onClick={() => this.menuMoveBook(list, bookInfo, bookInfo.id)}>{list}</li>;
    });
    return moveLists;
  };

  menuMoveBook = (list, book, id) => {
    if(this.props.showBookMenuMoveList) {
      this.props.toggleBookMenuMoveList();
    }    
    this.props.toggleBookMenu();
    this.props.moveBook(list, book, id);
  };

  menuRemoveBook = (currListName, id) => {
    if(this.props.showBookMenuMoveList) {
      this.props.toggleBookMenuMoveList();
    }
    this.props.toggleBookMenu();

    this.props.removeBook(currListName, id);
  };

  render() {
    const { bookInfo } = this.props;    
    const { isActive, index } = this.props.showBookMenu;
    const currentListName = this.props.currentList.listName;    
    const showBookMenuClass = isActive && index === this.props.index ? " show-menu" : "";
    const showMoveListClass = this.props.showBookMenuMoveList ? " show-move-list" : "";

    return (
      <div className={`book-menu${showBookMenuClass}`} ref={(node) => this.bookMenuRef = node}>
        <div className="book-menu-arrow"></div>
        <div className="book-menu-list-wrapper">
          <ul className="book-menu-list">
            { this.props.currentList.listName === "To Read"
              ? <li className="book-menu-done-reading" onClick={() => this.menuMoveBook("Read", bookInfo, bookInfo.id)}>Done Reading</li>
              : null
            }
            <li className="book-menu-move" onClick={() => this.props.toggleBookMenuMoveList()}>
              <span>Move To</span>
              <CaretRight/>
            </li>
            <li className="book-menu-remove" onClick={() => this.menuRemoveBook(currentListName, this.props.bookInfo.id)}>
              <Remove/>
              <span> Remove Book</span>
            </li>
          </ul>
          <ul className={`book-menu-move-list${showMoveListClass}`}>
            <li className="move-list-header" onClick={() => this.props.toggleBookMenuMoveList()}>
              <CaretRight/>
            </li>
            {this.populateMoveList()}
          </ul>
        </div>
      </div>
    )
  }

}

BookMenu.propTypes = {
  bookInfo: PropTypes.object.isRequired,  
  showBookMenu: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  currentList: PropTypes.object.isRequired,  
  getAllLists: PropTypes.func.isRequired,
  toggleBookMenuMoveList: PropTypes.func.isRequired,
  showBookMenuMoveList: PropTypes.bool.isRequired,
  toggleBookMenu: PropTypes.func.isRequired,
  moveBook: PropTypes.func.isRequired,
  removeBook: PropTypes.func.isRequired  
};

export default BookMenu;
