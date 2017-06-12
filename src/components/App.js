import React from 'react';
import Logo from './Logo';
import SearchBar from './SearchBar';
import ListPicker from './ListPicker';
import BookListPane from './BookListPane';

class App extends React.Component {
  render() {
    return (
      <div className="app-wrapper">
        <Logo/>
        <SearchBar/>
        <ListPicker/>
        <BookListPane/>
      </div> 
    )
  }
}

export default App;
