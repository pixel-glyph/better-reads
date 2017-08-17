import React from 'react';
import PropTypes from 'prop-types';

import BookList from './BookList';
import Overlay from './Overlay';

class ListPicker extends React.Component {
  
  getNumbooks = (list, i) => {
    const { lists } = this.props;
    const numBooks = lists[list].books
      ? Object.keys(lists[list].books).length
      : 0;
    
    return <BookList 
            key={i}
            listName={list}
            listDisplayName={list}
            numBooks={numBooks}
            toggleSideList={this.props.toggleSideList}
            switchList={this.props.switchList}/>;
  };
  
  render() {
    const { showList } = this.props;
    const showClass = showList.isActive ? " show-list" : "";
      
    return (
      <div>
        <div className={`app-list-picker${showClass}`}>
          <ul className="book-lists list-names">
            <li className="list-title">Switch List</li>
            {
              Object
                .keys(this.props.lists)
                .map((list, i) => this.getNumbooks(list, i))
            }
          </ul>
        </div>
        <Overlay 
          toggleSideList={this.props.toggleSideList} 
          showClass={showClass}/>
      </div>
    )
  }
}

ListPicker.propTypes = {
  lists: PropTypes.object.isRequired,
  toggleSideList: PropTypes.func.isRequired,
  showList: PropTypes.object.isRequired,
  switchList: PropTypes.func.isRequired
};

export default ListPicker;
