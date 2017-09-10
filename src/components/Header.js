import React from 'react';
import PropTypes from 'prop-types';

import Logo from './Logo';
import SearchBar from './SearchBar';

class Header extends React.Component {
  
  render() {
    const headerClass = this.props.showSearchBar ? ' show-header' : ''
    
    return (
      <div className={`app-header${headerClass}`}>
        <Logo/>
        <SearchBar 
          path={this.props.path} 
          history={this.props.history} 
          setResults={this.props.setResults}
          toggleFetch={this.props.toggleFetch}
          showSearchBar={this.props.showSearchBar}/>
      </div>
    )
  }
}

Header.propTypes = {
  setResults: PropTypes.func.isRequired,
  toggleFetch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  path: PropTypes.string.isRequired,
  showSearchBar: PropTypes.bool.isRequired
};

export default Header;
