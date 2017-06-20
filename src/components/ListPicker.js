import React from 'react';

class ListPicker extends React.Component {
  render() {
    const { lists } = this.props;
    return (
      <div className="app-list-picker">
        <ul className="book-lists">
          {
            Object
              .keys(lists)
              .map(list => <li>{lists[list].listName}</li>)
          }
        </ul>
      </div>
    )
  }
}

export default ListPicker;
