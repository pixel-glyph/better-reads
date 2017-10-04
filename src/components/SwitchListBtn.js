import React from 'react';
import PropTypes from 'prop-types';

import ListPicker from './ListPicker';
import ListIcon from './svg/List';

class SwitchListBtn extends React.Component {
  
  render() {
    return (
      <div className="switch-list-btn">
        <div className="btn-wrapper" onClick={() => this.props.toggleSideList()}>  
          <div className="btn-icon-wrapper">
            <ListIcon/>
          </div>
          <div className="switch-list-btn-title">
            <span>Switch Shelf</span>
          </div>
        </div>
        <ListPicker 
          lists={this.props.lists} 
          switchList={this.props.switchList}
          showList={this.props.showList}
          toggleSideList={this.props.toggleSideList}
          onMobile={true} />
      </div>
    )
  }
}

SwitchListBtn.propTypes = {
  lists: PropTypes.object.isRequired,
  switchList: PropTypes.func.isRequired,
  showList: PropTypes.object.isRequired,
  toggleSideList: PropTypes.func.isRequired
};

export default SwitchListBtn;
