import React from 'react';

import { getJSON } from '../get';
import { APIKey } from '../api';

class SearchBar extends React.Component {
  
  search = (e) => {
    e.preventDefault();
    const searchTerms = this.searchTerms.value.split(' ').join('+');
    const url = `https://www.googleapis.com/books/v1/volumes?q=${searchTerms}&key=${APIKey}`;
    
    if(this.props.path === '/') {
      this.props.history.push('/search');
      this.searchForm.reset();
    }
        
    getJSON(url).then(res => {
      this.props.setResults(res);
    }).catch(error => {
      console.log('There was an problem retrieving the search: ', error);
    });  // add another then() here to stop loading gif
  };
  
  render() {
    return (
      <div>
        <form ref={(input) => this.searchForm = input} className="book-search" onSubmit={(e) => this.search(e)}>
          <input ref={(input) => this.searchTerms = input} className="book-search-input" type="text" placeholder="Search Books..." />
          <button type="submit">Search</button>
        </form>
      </div>
    )
  }
}

export default SearchBar;
