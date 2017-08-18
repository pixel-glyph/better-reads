import React from 'react';
import { Route } from 'react-router-dom';
import update from 'immutability-helper';

import Logo from './Logo';
import SearchBar from './SearchBar';
import BookListPane from './BookListPane';
import Book from './Book';
import BookView from './BookView';
import AddBookBtn from './AddBookBtn';
import MoveBookBtn from './MoveBookBtn';
import SwitchListBtn from './SwitchListBtn';
import Plus from './svg/Plus';
import Modal from './Modal';

import base from '../base';

class App extends React.Component {
  constructor() {
    super();
    
    this.state = {
        bookLists: {},
        bookIDs: [],
        bookView: false,
        showList: {},
        searchResults: [],
        isFetching: false
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
        defaultValue: {
          isActive: false,
          index: 0
        }
      });
      
    this.ref = base.syncState('searchResults', 
      {
        context: this,
        state: 'searchResults',
        defaultValue: []
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
  
  getAllLists = (exceptList) => {
    if(exceptList) {
      let lists = Object.keys(this.state.bookLists);
      lists = lists.filter(list => list !== exceptList);
      return lists;
    }
    
    return Object.keys(this.state.bookLists);
  };
  
  addBookID = (id) => {
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
    
    this.addBookID(id);
    this.addBookToList(listName, newBook);
  };
  
  removeBookIDs = (removeIDs) => {
    const bookIDs = [...this.state.bookIDs];
    if(!Array.isArray(removeIDs)) {
      removeIDs = [removeIDs];
    }
    removeIDs.forEach(id => {
      const i = bookIDs.indexOf(id);
      if(i !== -1) {
        bookIDs.splice(i, 1);
      } else {
        console.warn('ID not found in bookIDs');
      }
    });
    
    this.setState(newState => {
      return {
        bookIDs: update(newState.bookIDs, {$set: bookIDs})
      };
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
  
  // for removing a book entirely from the user's collection
  removeBook = (listName, bookID) => {
    this.removeBookIDs(bookID);
    this.removeBookFromList(listName, bookID);
    this.removeBookViewList();
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
    this.setState(newState => {
      return {
        bookLists: update(newState.bookLists, {$set: bookLists})
      };
    });
  };
  
  removeList = (listName) => {
    // TODO: gather IDs of all books in list, pass ID array to removeBookIDs
    
    const bookLists = {...this.state.bookLists};
    if(!this.doesListExist(bookLists, listName)) {
      return alert('list does not exist');
    }
    bookLists[listName] = null;
    this.setState(newState => {
      return {
        bookLists: update(newState.bookLists, {$set: bookLists})
      };
    });
  };
    
  switchList = (listName) => {
    const currList = this.getCurrentList();
    if(listName === currList.listName) return;
    this.toggleSelected(listName);
    this.toggleSelected(currList.listName);
  };
  
  toggleFetch = () => {
    let isFetching = this.state.isFetching;
    isFetching = !isFetching;
    this.setState(newState => {
      return {
        isFetching: update(newState.isFetching, {$set: isFetching})
      };
    });
  };
  
  setResults = (results) => {
    let searchResults;
    if(results.items) {
      searchResults = results.items.map(book => {
        const author = book.volumeInfo.authors ? book.volumeInfo.authors[0] : '';
        const desc = book.volumeInfo.description ? book.volumeInfo.description : '';
        const pubDate = book.volumeInfo.publishedDate ? book.volumeInfo.publishedDate : '';
        const img = book.volumeInfo.imageLinks 
          ? book.volumeInfo.imageLinks.smallThumbnail
          : 'https://books.google.com/googlebooks/images/no_cover_thumb.gif';
          
        return {
          title: book.volumeInfo.title,
          id: book.id,
          pubDate,
          author,
          desc,
          img
        };
      });
    } else {
      searchResults = [];
    }
    this.setState(newState => {
      return {
        searchResults: update(newState.searchResults, {$set: searchResults})
      };
    });
  };
  
  listResults = () => {
    const { searchResults } = this.state;
    if(!searchResults.length) {
      return <li className="book no-results">No Results</li>;
    }
    
    const results = searchResults.map( (book, i) => {
      if(this.doesBookExist(book.id)) {
        const lists = this.getAllLists();
        
        lists.forEach((list) => {
          if(this.isBookInList(this.state.bookLists[list].books, book.id)) {
            book.list = list;
            return;
          }
        });
        
        return (
          <li key={i}>
            <Book bookInfo={book} addNewBook={this.addNewBook}/>
            <MoveBookBtn
              bookInfo={book} 
              moveBook={this.moveBook}
              getAllLists={this.getAllLists}
              showList={this.state.showList}
              toggleSideList={this.toggleSideList}
              syncBookView={this.syncBookView}
              index={i}/>
          </li>
        );
      } else {
        return (
          <li key={i}>
            <Book bookInfo={book} addNewBook={this.addNewBook}/>
            <AddBookBtn 
              bookInfo={book} 
              addNewBook={this.addNewBook}
              getAllLists={this.getAllLists}
              showList={this.state.showList}
              toggleSideList={this.toggleSideList}
              syncBookView={this.syncBookView}
              index={i}/>
          </li>
        )
      }
    });
    
    return results;
  };
  
  setBookView = (book) => {
    const bookView = {...this.state.bookView};
    
    bookView.list = book.list || null;
    bookView.author = book.author;
    bookView.desc = book.desc;
    bookView.id = book.id;
    bookView.img = book.img;
    bookView.pubDate = book.pubDate;
    bookView.title = book.title;
    
    this.setState(newState => {
      return {
        bookView: update(newState.bookView, {$set: bookView})
      };
    });
  };
  
  removeBookViewList = () => {
    const bookView = {...this.state.bookView};
    bookView.list = null;
    this.setState(newState => {
      return {
        bookView: update(newState.bookView, {$set: bookView})
      };
    });
  };
  
  toggleSideList = (i=0) => {
    const showList = {...this.state.showList};
    showList.isActive = !showList.isActive;
    showList.index = i;
    this.setState(newState => {
      return {
        showList: update(newState.showList, {$set: showList})
      };
    });
  };
  
  render() {
    const Main = () => (
      <div className="main-wrapper">
        <SwitchListBtn 
          switchList={this.switchList}
          toggleSideList={this.toggleSideList}
          showList={this.state.showList}
          lists={this.state.bookLists}/>
        <Plus/>
        <BookListPane currentList={this.getCurrentList()}/>
        <Modal/>
      </div>
    );
    
    const Search = () => (
      <div className="search-wrapper">
        {!this.state.isFetching
          ? <ul className="search-results">
              {this.listResults()}
            </ul>
          : <div className="fetch-spinner">
              <div className="bounce1"></div>
              <div className="bounce2"></div>
              <div className="bounce3"></div>
            </div>
        }
      </div>
    );

    return (
      <div className="app-wrapper">
        <Logo/>
        <SearchBar 
          path={this.props.location.pathname} 
          history={this.props.history} 
          setResults={this.setResults}
          toggleFetch={this.toggleFetch}/>
        
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
            toggleSideList={this.toggleSideList}
            moveBook={this.moveBook}
            removeBook={this.removeBook}/>
        )}/>
      </div>
    )
  }
}

export default App;
