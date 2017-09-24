import React from 'react';
import PropTypes from 'prop-types';

class Menu extends React.Component {
  render() {
    const { isActive, index } = this.props.showBookMenu;
    const showClass = isActive && index === this.props.index ? " focused" : "";

    return (
      <svg className={`btn-icon icon-menu${showClass}`} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path d="M12 18c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3zm0-9c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3zm0-9c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3z"/>
      </svg>
    )
  }

}

Menu.propTypes = {
  showBookMenu: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired
};

export default Menu;
