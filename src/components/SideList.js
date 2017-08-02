import React from 'react';
import PropTypes from 'prop-types';

class SideList extends React.Component {  
  
  render() {
    const { showList } = this.props;
    const showClass = showList ? " show-list" : "";
    return (
      <div className={`add-list-select${showClass}`}>
        <ul className="list-names">
          {
            this.props.getAllLists().map((list, i) => {
              return <li className="list-name" key={i}>{list}</li>
            })
          }
        </ul>
      </div>
    )
  }
};

SideList.propTypes = {
  showList: PropTypes.bool.isRequired,
  getAllLists: PropTypes.func.isRequired
};

export default SideList;
