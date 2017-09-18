import React from 'react';
import PropTypes from 'prop-types';

class Plus extends React.Component {
  render() {
    const size = this.props.onDesktop ? "30" : "24";
    return (
      <svg className="btn-icon icon-plus" fill="#ffffff" width={size} height={size} viewBox="0 0 24 24">
        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
        <path d="M0 0h24v24H0z" fill="none"/>
      </svg>      
    )
  }
}

Plus.propTypes = {
  onDesktop: PropTypes.bool
};

export default Plus;
