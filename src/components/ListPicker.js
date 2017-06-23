import React from 'react';
import BookList from './BookList';
import PropTypes from 'prop-types';

class ListPicker extends React.Component {
  render() {
    const { lists } = this.props;
    return (
      <div className="app-list-picker">
        <ul className="book-lists">
          {
            Object
              .keys(lists)
              .map((list, i) => 
                <BookList 
                  key={i}
                  listName={list}
                  listDisplayName={lists[list].listName}
                  numBooks={Object.keys(lists[list].books).length}
                  switchList={this.props.switchList}/>
              )
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
