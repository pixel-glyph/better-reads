import React from 'react';
import PropTypes from 'prop-types';

class Overlay extends React.Component {
  
  render() {
    return (
      <div className={`overlay${this.props.showClass}`} onClick={() => this.props.toggleSideList()}></div>
    )
  }
};

Overlay.propTypes = {
  toggleSideList: PropTypes.func.isRequired,
  showClass: PropTypes.string.isRequired
};

export default Overlay;
