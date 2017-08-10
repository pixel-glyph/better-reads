import React from 'react';
import PropTypes from 'prop-types';

class Overlay extends React.Component {
  
  render() {
    const showClass = this.props.showList ? " show-overlay" : "";
    return (
      <div className={`overlay${showClass}`} onClick={() => this.props.toggleSideList()}></div>
    )
  }
};

Overlay.propTypes = {
  toggleSideList: PropTypes.func.isRequired,
  showList: PropTypes.bool.isRequired
};

export default Overlay;
