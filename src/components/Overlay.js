import React from 'react';
import PropTypes from 'prop-types';

class Overlay extends React.Component {
  
  render() {
    const showClass = this.props.showOverlay ? ' show-overlay' : ''
    return (
      <div className={`overlay${showClass}`} onClick={() => this.props.toggle()}></div>
    )
  }
};

Overlay.propTypes = {
  showOverlay: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired
};

export default Overlay;
