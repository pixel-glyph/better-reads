import React from 'react';
import { Route } from 'react-router-dom';
import update from 'immutability-helper';

import Logo from './Logo';
import SearchBar from './SearchBar';
import ListPicker from './ListPicker';
import BookListPane from './BookListPane';
import Book from './Book';
import BookView from './BookView';

import base from '../base';

class App extends React.Component {
  constructor() {
    super();
    
    this.state = {
        bookLists: {},
        bookIDs: [],
        bookView: false,
        showList: false,
        searchResults: []
    };
  }
  
  componentWillMount() {
    this.ref = base.syncState('bookLists',
      {
        context: this,
        state: 'bookLists',
        defaultValue: {
          'To Read': {
            listName: 'To Read',
            selected: true,
            books: {}
          },
          
          'Read': {
            listName: 'Read',
            selected: false,
            books: {}
          }
        }
      });
      
    this.ref = base.syncState('bookIDs', 
      {
        context: this,
        state: 'bookIDs',
        defaultValue: []
      });
      
    this.ref = base.syncState('bookView', 
      {
        context: this,
        state: 'bookView',
        defaultValue: false
      });
      
    this.ref = base.syncState('showList', 
      {
        context: this,
        state: 'showList',
        defaultValue: false
      });
  }
  
  componentWillUnmount() {
    base.removeBinding(this.ref);
  }
  
  
  doesBookExist = (id) => {
    return this.state.bookIDs.includes(id);
  };
  
  doesListExist = (bookLists, listName) => {
    return bookLists.hasOwnProperty(listName);
  };
  
  isBookInList = (books, bookID) => {
    return books.hasOwnProperty(bookID);
  };
  
  getAllLists = () => {
    return Object.keys(this.state.bookLists);
  };
  
  addBook = (id) => {
    const bookIDs = [...this.state.bookIDs];
    bookIDs.push(id);
    this.setState(newState => {
      return {
        bookIDs: update(newState.bookIDs, {$set: bookIDs})
      };
    });
  };
  
  addBookToList = (listName, book) => {
    const books = {...this.state.bookLists[listName].books};
    book.list = listName;
    books[book.id] = book;
    
    this.setState(newState => {
      return {
        bookLists: update(newState.bookLists, {[listName]: {books: {$set: books}}})
      };
    });
  };
  
  // for adding a new book from search
  addNewBook = (listName, newBook) => {
    const id = newBook.id;
    if(this.doesBookExist(id)) {
      return alert('book is already in a shelf');
    }
    
    this.addBook(id);
    this.addBookToList(listName, newBook);
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
  
  moveBook = (toList, book, id) => {
    this.removeBookFromList(book.list, id);
    this.addBookToList(toList, book);
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
    this.setState({ bookLists });
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
      const desc = book.volumeInfo.description ? book.volumeInfo.description : '';
      const img = book.volumeInfo.imageLinks 
        ? book.volumeInfo.imageLinks.smallThumbnail
        : 'https://books.google.com/googlebooks/images/no_cover_thumb.gif';
        
      return {
        title: book.volumeInfo.title,
        pubDate: book.volumeInfo.publishedDate,
        id: book.id,
        author,
        desc,
        img
      };
    });
    
    this.setState({ searchResults });
  };
  
  listResults = () => {
    const { searchResults } = this.state;
    if(!searchResults.length) {
      return <li className="book no-results">No Results</li>;
    }
    
    const results = searchResults.map( (book, i) => {
      return (
        <Book 
          key={i} 
          bookInfo={book} 
          addNewBook={this.addNewBook}/>
      );
    });
    
    return results;
  };
  
  setBookView = (book) => {
    let bookView = {...this.state.bookView};
    bookView = book;
    this.setState({ bookView });
  };
  
  toggleSideList = () => {
    let showList = this.state.showList;
    showList = !showList;
    this.setState({ showList });
  };
  
  render() {
    const Main = () => (
      <div className="main-wrapper">
        <ListPicker switchList={this.switchList} lists={this.state.bookLists}/>
        <BookListPane currentList={this.getCurrentList()}/>
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
        <SearchBar 
          path={this.props.location.pathname} 
          history={this.props.history} 
          setResults={this.setResults}/>
        
        <Route exact path="/" component={Main}/>
        <Route path="/search" component={Search}/>
        <Route path="/book/:id" render={(props) => (
          <BookView 
            {...props} 
            bookID={props.match.params.id} 
            bookInfo={this.state.bookView}
            setBookView={this.setBookView}
            doesBookExist={this.doesBookExist}
            addNewBook={this.addNewBook}
            getAllLists={this.getAllLists}
            showList={this.state.showList}
            toggleSideList={this.toggleSideList}/>
        )}/>
      </div>
    )
  }
}

export default App;
