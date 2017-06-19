import React from 'react';
import Logo from './Logo';
import SearchBar from './SearchBar';
import ListPicker from './ListPicker';
import BookListPane from './BookListPane';

// add book

// remove book

class App extends React.Component {
  constructor() {
    super();
    
    this.state = {
      bookLists: {
        
        'to-read': {
          listName: 'To Read',
          selected: true,
          books: {
            'book-1': {
              title: 'To Kill A Mockingbird',
              author: 'Harper Lee',
              pubDate: '1952',
              img: 'url-to-image',
              list: 'to-read'
            },
            'book-2:': {
              title: 'The Tempest',
              author: 'William Shakespeare',
              pubDate: '1519',
              img: 'url-to-image',
              list: 'to-read'  
            }
          }
        },
      
        'favorites': {
          listName: 'Favorites',
          selected: false,
          books: {
            'book-3': {
              title: 'Infinite Jest',
              author: 'David Foster Wallace',
              pubDate: '1994',
              img: 'url-to-image',
              list: 'favorites'
            }
          }
        }
      
      }
    };
  }
  
  getCurrentList = () => {
    const currListName =  
      Object
        .keys(this.state.bookLists)
        .find(list => {
          return this.state.bookLists[list].selected;
        });
    
    return this.state.bookLists[currListName];
  };
  
  render() {
    return (
      <div className="app-wrapper">
        <Logo/>
        <SearchBar/>
        <ListPicker/>
        <BookListPane currentList={this.getCurrentList()}/>
      </div> 
    )
  }
}

export default App;
