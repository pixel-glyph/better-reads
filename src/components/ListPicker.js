import React from 'react';
import PropTypes from 'prop-types';

import BookList from './BookList';
import Overlay from './Overlay';
import Plus from './svg/Plus';

class ListPicker extends React.Component {
  
  getNumbooks = (list, i) => {
    const { lists } = this.props;
    const numBooks = lists[list] && lists[list].books
      ? Object.keys(lists[list].books).length
      : 0;
    
    return <BookList 
            key={i}
            listName={list}
            listDisplayName={list}
            numBooks={numBooks}
            toggleSideList={this.props.toggleSideList}
            switchList={this.props.switchList}
            onMobile={this.props.onMobile} />;
  };
  
  render() {
    const { showList, fixList } = this.props;
    const showClass = showList.isActive ? " show-list" : "";
    const posClass = fixList ? " list-picker-fixed" : "";
    
    let lists = Object.keys(this.props.lists);
    
    lists.forEach((list, i) => {
    	if(list === "Read" || list === "To Read") { 
    		lists.splice(i, 1);
        lists.unshift(list);
    	}
    });
      
    return (
      <div className={`app-list-picker-wrapper${posClass}`}>
        <div className={`app-list-picker${showClass}`}>
          <ul className="book-lists list-names">
            <li className="list-title">Switch List</li>
            {
              lists.map((list, i) => this.getNumbooks(list, i))
            }
          </ul>
        </div>
        <div className="add-list-wrapper" onClick={() => this.props.toggleModal()}>
          <Plus onDesktop={true}/>
          <span>Create new list</span>
        </div>
        <Overlay 
          toggle={this.props.toggleSideList} 
          showOverlay={showList.isActive} />
      </div>
    )
  }
}

ListPicker.propTypes = {
  lists: PropTypes.object.isRequired,
  toggleSideList: PropTypes.func.isRequired,
  showList: PropTypes.object.isRequired,
  switchList: PropTypes.func.isRequired,
  toggleModal: PropTypes.func,
  onMobile: PropTypes.bool,
  fixList: PropTypes.bool
};

export default ListPicker;
