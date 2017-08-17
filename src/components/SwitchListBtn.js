import React from 'react';
import PropTypes from 'prop-types';

import ListIcon from './svg/List';

class SwitchListBtn extends React.Component {
  
  render() {
    return (
      <div className="switch-list-btn">
        <div className="btn-wrapper">  
          <div className="btn-icon-wrapper">
            <ListIcon/>
          </div>
          <div className="switch-list-btn-title">
            <span>Switch List</span>
          </div>
        </div>
        {/*SideList*/}
      </div>
    )
  }
}

SwitchListBtn.propTypes = {
  
};

export default SwitchListBtn;
