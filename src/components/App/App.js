import React from 'react';
import './App.css';
import Logo from './../Logo/Logo';
import SearchBar from './../SearchBar/SearchBar';
import ListPicker from './../ListPicker/ListPicker';
import BookListPane from './../BookListPane/BookListPane';

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
