import React from 'react';
import BookList from './BookList';
import PropTypes from 'prop-types';

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
            switchList={this.props.switchList}/>;
  };
  
  render() {
    return (
      <div className="app-list-picker">
        <ul className="book-lists">
          {
            Object
              .keys(this.props.lists)
              .map((list, i) => this.getNumbooks(list, i))
          }
        </ul>
      </div>
    )
  }
}

ListPicker.propTypes = {
  lists: PropTypes.object.isRequired,
  switchList: PropTypes.func.isRequired
};

export default ListPicker;
