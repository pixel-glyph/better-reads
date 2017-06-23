import React from 'react';
import PropTypes from 'prop-types';

class BookList extends React.Component {  
  render() {
    const { listDisplayName, listName } = this.props;
    return(
      <li onClick={() => this.props.switchList(listName)}>
        <span>{listDisplayName} </span>
        <span>({this.props.numBooks})</span>
      </li>
    )
  }
}

BookList.propTypes = {
  listName: PropTypes.string.isRequired,
  listDisplayName: PropTypes.string.isRequired,
  numBooks: PropTypes.number.isRequired,
  switchList: PropTypes.func.isRequired
};

export default BookList;
