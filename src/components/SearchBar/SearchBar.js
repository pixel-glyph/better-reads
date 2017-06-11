import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
  render() {
    return (
      <div className="app-search">
        <input className="app-search-input" type="text" placeholder="Search..."/>
      </div>
    )
  }
}

export default SearchBar;
