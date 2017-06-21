import React from 'react';
import PropTypes from 'prop-types';

class BookList extends React.Component {
  
  switchCurrentList = () => {
    console.log('switching');
  };
  
  render() {
    const { listName } = this.props;
    return(
      <li onClick={this.switchCurrentList}>
        <span>{listName} </span>
        <span>({this.props.numBooks})</span>
      </li>
    )
  }
}

BookList.propTypes = {
  listName: PropTypes.string.isRequired,
  numBooks: PropTypes.number.isRequired
};

export default BookList;
