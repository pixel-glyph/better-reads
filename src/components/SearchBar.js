import React from 'react';
import { Redirect } from 'react-router-dom';

import { getJSON } from '../get';
import { APIKey } from '../api';

class SearchBar extends React.Component {
  
  search = (e) => {
    e.preventDefault();
    this.props.isOnSearch();
    
    const searchTerms = this.searchTerms.value.split(' ').join('+');
    const url = `https://www.googleapis.com/books/v1/volumes?q=${searchTerms}&key=${APIKey}`;
        
    getJSON(url).then(res => {
      this.props.setResults(res);
    }).catch(error => {
      console.log('There was an problem retrieving the search: ', error);
    });  // add another then() here to stop loading gif
  };
  
  render() {
    const { onSearch } = this.props;
    return (
      <div>
        <form className="book-search" onSubmit={(e) => this.search(e)}>
          <input ref={(input) => this.searchTerms = input} className="book-search-input" type="text" placeholder="Search..." />
          <button type="submit">Search</button>
        </form>
        {
          onSearch && (<Redirect to="/search"/>)
        }
      </div>
    )
  }
}

export default SearchBar;
