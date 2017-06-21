import React from 'react';
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
              .map(list => <li key={list}>{lists[list].listName}</li>)
          }
        </ul>
      </div>
    )
  }
}

ListPicker.propTypes = {
  lists: PropTypes.object.isRequired
};

export default ListPicker;
