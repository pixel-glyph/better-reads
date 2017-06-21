import React from 'react';
import update from 'immutability-helper';
import Logo from './Logo';
import SearchBar from './SearchBar';
import ListPicker from './ListPicker';
import BookListPane from './BookListPane';

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
        
        'read': {
          listName: 'Read',
          selected: false,
          books: {
            'book-3': {
              title: 'Ragtime',
              author: 'E.L. Doctorow',
              pubDate: '1931',
              img: 'url-to-image',
              list: 'read'
            },
            'book-4:': {
              title: 'Middlesex',
              author: 'Jeffery Eugenides',
              pubDate: '2004',
              img: 'url-to-image',
              list: 'read'  
            }
          }
        },
      
        'favorites': {
          listName: 'Favorites',
          selected: false,
          books: {
            'book-5': {
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
  
  // newBook will come from api
  addBookToList = (list, newBook) => {
    const books = {...this.state.bookLists[list].books};
    const id = Date.now();
    newBook.list = list;
    books[`book-${id}`] = newBook;
    this.setState({
      bookLists: update(this.state.bookLists, {[list]: {books: {$set: books}}})
    });
  };
  
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
        <ListPicker lists={this.state.bookLists}/>
        <BookListPane 
          currentList={this.getCurrentList()}
          addBook={this.addBookToList}/>
      </div>
    )
  }
}

export default App;
