import React from 'react';
import PropTypes from 'prop-types';

import Logo from './Logo';
import SearchBar from './SearchBar';
import { CSSTransitionGroup } from 'react-transition-group';

class Header extends React.Component {
  
  render() {
    let header = this.props.showHeader
      ? <div key={this.props.path} className='app-header'>
          <Logo/>
          <SearchBar 
            path={this.props.path} 
            history={this.props.history} 
            setResults={this.props.setResults}
            toggleFetch={this.props.toggleFetch}
            toggleBookMenu={this.props.toggleBookMenu}
            isBookMenuActive={this.props.isBookMenuActive} />
        </div>
      : null;
    
    return (
      <CSSTransitionGroup
        transitionName="header"
        transitionEnterTimeout={200}
        transitionLeaveTimeout={200}>
        {header}
      </CSSTransitionGroup>
    )
  }
}

Header.propTypes = {
  setResults: PropTypes.func.isRequired,
  toggleFetch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  path: PropTypes.string.isRequired,
  showHeader: PropTypes.bool.isRequired,
  isBookMenuActive: PropTypes.bool.isRequired,
  toggleBookMenu: PropTypes.func.isRequired
};

export default Header;
