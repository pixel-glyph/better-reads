import React from 'react';

import { getJSON } from '../get';
import { APIKey } from '../api';

class SearchBar extends React.Component {
  
  search = (e) => {
    e.preventDefault();
    const searchTerms = this.searchTerms.value.split(' ').join('+');
    const url = `https://www.googleapis.com/books/v1/volumes?q=${searchTerms}&key=${APIKey}`;
        
    getJSON(url).then(res => {
      this.props.listResults(res);
    }).catch(error => {
      console.log('There was an problem retrieving the search: ', error);
    });  // add another then() here to stop loading gif
  };
  
  render() {
    return (
      <form className="book-search" onSubmit={(e) => this.search(e)}>
        <input ref={(input) => this.searchTerms = input} className="book-search-input" type="text" placeholder="Search..." />
        <button type="submit">Search</button>
      </form>
    )
  }
}

export default SearchBar;
