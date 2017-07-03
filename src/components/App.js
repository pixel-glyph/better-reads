import React from 'react';
import update from 'immutability-helper';
import Logo from './Logo';
import SearchBar from './SearchBar';
import ListPicker from './ListPicker';
import BookListPane from './BookListPane';
// import base from '../base';

import { getJSON } from '../google-books';

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
          
        }
      
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
  
  
  search = (terms) => {
    const searchTerms = terms.split(' ').join('+');
    const APIKey = '';
    const url = `https://www.googleapis.com/books/v1/volumes?q=${searchTerms}&key=${APIKey}`;
        
    getJSON(url).then(res => {
      console.log('woo book!', res);
    }).catch(error => {
      console.log('There was an problem retrieving the search: ', error);
    });  // add another then() here to stop loading gif
  };
    
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
      return alert('book is already in list!');
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
      return alert('book is not in list!');
    }
    books[bookID] = null;
    this.setState(newState => {
      return {
        bookLists: update(this.state.bookLists, {[listName]: {books: {$set: books}}})
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
      return alert('list already exists!');
    }
    // sample data for testing
    bookLists[listName] = {
      listName: listName,
      selected: false,
      books: {}
    };
    this.setState({ bookLists });
  };
  
  // TODO: removeList
    
  switchList = (listName) => {
    const currList = this.getCurrentList();
    if(listName === currList.listName) return;
    this.toggleSelected(listName);
    this.toggleSelected(currList.listName);
  };
  
  render() {
    return (
      <div className="app-wrapper">
        <Logo/>
        <SearchBar/>
        <ListPicker switchList={this.switchList} lists={this.state.bookLists}/>
        <BookListPane 
          currentList={this.getCurrentList()}
          addBook={this.addBookToList}/>
      </div>
    )
  }
}

export default App;
