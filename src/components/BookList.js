import React from 'react';
import PropTypes from 'prop-types';

class BookList extends React.Component {  
  switchListSelect = (list) => {
    if(this.props.onMobile) {
      this.props.toggleSideList();
    }
    this.props.switchList(list);
  };
  
  render() {
    const { listDisplayName, listName } = this.props;
    return(
      <li className="list-name" onClick={() => this.switchListSelect(listName)}>
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
  toggleSideList: PropTypes.func.isRequired,
  switchList: PropTypes.func.isRequired,
  onMobile: PropTypes.bool
};

export default BookList;
