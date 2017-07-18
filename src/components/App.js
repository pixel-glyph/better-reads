import React from 'react';
import { Route } from 'react-router-dom';
import update from 'immutability-helper';

import Logo from './Logo';
import SearchBar from './SearchBar';
import ListPicker from './ListPicker';
import BookListPane from './BookListPane';
import Book from './Book';
// import base from '../base';

class App extends React.Component {
  constructor() {
    super();
    
    this.state = {
        bookLists: {
          'To Read': {
            listName: 'To Read',
            selected: true,
            books: {
              'book-1': {
                title: 'To Kill A Mockingbird',
                author: 'Harper Lee',
                pubDate: '1952',
                img: 'url-to-image',
                list: 'To Read'
              },
              'book-2': {
                title: 'The Tempest',
                author: 'William Shakespeare',
                pubDate: '1519',
                img: 'url-to-image',
                list: 'To Read'  
              }
            }
          },
          
          'Read': {
            listName: 'Read',
            selected: false,
            books: {
              'book-3': {
                title: 'Ragtime',
                author: 'E.L. Doctorow',
                pubDate: '1931',
                img: 'url-to-image',
                list: 'Read'
              },
              'book-4': {
                title: 'Middlesex',
                author: 'Jeffery Eugenides',
                pubDate: '2004',
                img: 'url-to-image',
                list: 'Read'  
              }
            }
          },
        
          'Favorites': {
            listName: 'Favorites',
            selected: false,
            books: {
              'book-5': {
                title: 'Infinite Jest',
                author: 'David Foster Wallace',
                pubDate: '1994',
                img: 'url-to-image',
                list: 'Favorites'
              }
            }
          }
          
        },
        
        searchResults: []
          
    };
  }
  // 
  // componentWillMount() {
  //   this.ref = base.syncState('bookLists',
  //     {
  //       context: this,
  //       state: 'bookLists',
  //       defaultValue: {
  //         'To Read': {
  //           listName: 'To Read',
  //           selected: true,
  //           books: {
  //             'book-1': {
  //               title: 'To Kill A Mockingbird',
  //               author: 'Harper Lee',
  //               pubDate: '1952',
  //               img: 'url-to-image',
  //               list: 'To Read'
  //             },
  //             'book-2': {
  //               title: 'The Tempest',
  //               author: 'William Shakespeare',
  //               pubDate: '1519',
  //               img: 'url-to-image',
  //               list: 'To Read'  
  //             }
  //           }
  //         },
  //         
  //         'Read': {
  //           listName: 'Read',
  //           selected: false,
  //           books: {
  //             'book-3': {
  //               title: 'Ragtime',
  //               author: 'E.L. Doctorow',
  //               pubDate: '1931',
  //               img: 'url-to-image',
  //               list: 'Read'
  //             },
  //             'book-4': {
  //               title: 'Middlesex',
  //               author: 'Jeffery Eugenides',
  //               pubDate: '2004',
  //               img: 'url-to-image',
  //               list: 'Read'  
  //             }
  //           }
  //         },
  //       
  //         'Favorites': {
  //           listName: 'Favorites',
  //           selected: false,
  //           books: {
  //             'book-5': {
  //               title: 'Infinite Jest',
  //               author: 'David Foster Wallace',
  //               pubDate: '1994',
  //               img: 'url-to-image',
  //               list: 'Favorites'
  //             }
  //           }
  //         }
  //         
  //       }
  //     });
  // }
  // 
  // componentWillUnmount() {
  //   base.removeBinding(this.ref);
  // }
  
    
  doesListExist = (bookLists, listName) => {
    return bookLists.hasOwnProperty(listName);
  };
  
  isBookInList = (books, bookID) => {
    return books.hasOwnProperty(bookID);
  };
  
  // newBook will come from api
  addBookToList = (listName, newBook) => {
    const books = {...this.state.bookLists[listName].books};
    // use id prop from api instead of date ts
    const id = Date.now();
    if(this.isBookInList(books, newBook.ID)) {
      return alert('book is already in list');
    }
    newBook.list = listName;
    books[`book-${id}`] = newBook;
    this.setState({
      bookLists: update(this.state.bookLists, {[listName]: {books: {$set: books}}})
    });
  };
  
  removeBookFromList = (listName, bookID) => {
    const books = {...this.state.bookLists[listName].books};
    if(!this.isBookInList(books, bookID)) {
      return alert('book is not in list');
    }
    books[bookID] = null;
    this.setState(newState => {
      return {
        bookLists: update(newState.bookLists, {[listName]: {books: {$set: books}}})
      };
    });
  };
  
  getCurrentList = () => {
    const currListName =  
      Object
        .keys(this.state.bookLists)
        .find(list => this.state.bookLists[list].selected);
    
    return this.state.bookLists[currListName]
      ? this.state.bookLists[currListName]
      : {};
  };
  
  toggleSelected = (listName) => {
    let selected = this.state.bookLists[listName].selected;
    selected = !selected;
    this.setState(newState => {
      return {
        bookLists: update(newState.bookLists, {[listName]: {selected: {$set: selected}}})
      };
    });
  };
    
  createList = (listName) => {
    const bookLists = {...this.state.bookLists};
    if(this.doesListExist(bookLists, listName)) {
      return alert('list already exists');
    }
    // sample data for testing
    bookLists[listName] = {
      listName: listName,
      selected: false,
      books: {}
    };
    this.setState({ bookLists });
  };
  
  removeList = (listName) => {
    const bookLists = {...this.state.bookLists};
    if(!this.doesListExist(bookLists, listName)) {
      return alert('list does not exist');
    }
    bookLists[listName] = null;
    this.setState(newState => {
      return {bookLists: newState.bookLists};
    });
  };
    
  switchList = (listName) => {
    const currList = this.getCurrentList();
    if(listName === currList.listName) return;
    this.toggleSelected(listName);
    this.toggleSelected(currList.listName);
  };
  
  setResults = (results) => {
    const searchResults = results.items.map(book => {
      const author = book.volumeInfo.authors ? book.volumeInfo.authors[0] : '';
      const img = book.volumeInfo.imageLinks 
        ? book.volumeInfo.imageLinks.smallThumbnail
        : 'no-cover-img';
        
      return {
        title: book.volumeInfo.title,
        pubDate: book.volumeInfo.publishedDate,
        author,
        img,
      };
    });
    
    this.setState({ searchResults });
  };
  
  listResults = () => {
    const { searchResults } = this.state;
    if(!searchResults.length) {
      return <li className="book">No Results</li>;
    }
    
    const results = searchResults.map( (book, i) => {
      return (
        <Book key={i} bookInfo={book}/>
      );
    });
    
    return results;
    
  };
  
  render() {
    const Main = () => (
      <div className="main-wrapper">
        <ListPicker switchList={this.switchList} lists={this.state.bookLists}/>
        <BookListPane 
          currentList={this.getCurrentList()}
          addBook={this.addBookToList}/>
      </div>
    );
    
    const Search = () => (
      <div className="search-wrapper">
        <ul className="search-results">
          {
            this.listResults()
          }
        </ul>
      </div>
    );

    return (
        <div className="app-wrapper">
          <Logo/>
          <SearchBar setResults={this.setResults}/>
          
          <Route exact path="/" component={Main}/>
          <Route path="/search" component={Search}/>
        </div>
    )
  }
}

export default App;
