import React from 'react';
import PropTypes from 'prop-types';

import SearchIcon from './svg/Search';

import { getJSON } from '../get';
import { APIKey } from '../api';

class SearchBar extends React.Component {
  
  search = (e) => {
    e.preventDefault();
    if(!this.searchTerms.value) return;
    
    this.props.toggleFetch();
    const searchTerms = this.searchTerms.value.split(' ').join('+');
    const url = `https://www.googleapis.com/books/v1/volumes?q=${searchTerms}&key=${APIKey}`;
    
    if(this.props.path !== '/search') {
      this.props.history.push('/search');
      this.searchForm.reset();
    }
        
    getJSON(url).then(res => {
      this.props.setResults(res);
      this.props.toggleFetch();
    }).catch(error => {
      console.log('There was an problem retrieving the search: ', error);
    });  // add another then() here to stop loading gif
  };
  
  render() {
    return (
      <div>
        <form ref={(input) => this.searchForm = input} className="book-search" onSubmit={(e) => this.search(e)}>
          <input ref={(input) => this.searchTerms = input} className="book-search-input" type="text" placeholder="Search Books..." />
          <button type="submit">
            <SearchIcon/>
          </button>
        </form>
      </div>
    )
  }
}

SearchBar.propTypes = {
  setResults: PropTypes.func.isRequired,
  toggleFetch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  path: PropTypes.string.isRequired,
};

export default SearchBar;
