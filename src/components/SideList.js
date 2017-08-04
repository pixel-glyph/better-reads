import React from 'react';
import PropTypes from 'prop-types';

class SideList extends React.Component {  
  listSelect = (e) => {
    const list = e.target.textContent;
    const newBook = this.props.bookInfo;
    this.props.addNewBook(list, newBook);
  };
  
  render() {
    const { showList } = this.props;
    const showClass = showList ? " show-list" : "";
    
    return (
      <div className={`add-list-select${showClass}`}>
        <ul className="list-names">
          <li className="list-title">{this.props.listTitle}</li>
          {
            this.props.getAllLists().map((list, i) => {
              return <li className="list-name" key={i} onClick={(e) => this.listSelect(e)}>{list}</li>
            })
          }
        </ul>
      </div>
    )
  }
};

SideList.propTypes = {
  showList: PropTypes.bool.isRequired,
  getAllLists: PropTypes.func.isRequired,
  addNewBook: PropTypes.func.isRequired,
  listTitle: PropTypes.string.isRequired,
  bookInfo: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool
  ])
};

export default SideList;
