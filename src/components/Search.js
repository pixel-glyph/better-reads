import React from 'react';  
import SearchBar from './SearchBar';

import { getBook } from '../get';

class Search extends React.Component {
  
  render() {
    return (
      <div className="search-wrapper">
        <SearchBar/>
        <ul className="search-results">
          
        </ul>
      </div>
    )
  }
}

export default Search;
