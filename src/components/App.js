import React from 'react';
import { Route } from 'react-router-dom';
import update from 'immutability-helper';

import Logo from './Logo';
import SearchBar from './SearchBar';
import Header from './Header';
import BookListPane from './BookListPane';
import Book from './Book';
import BookView from './BookView';
import AddBookBtn from './AddBookBtn';
import MoveBookBtn from './MoveBookBtn';
import ListPicker from './ListPicker';
import SwitchListBtn from './SwitchListBtn';
import PlusIcon from './svg/Plus';
import RemoveIcon from './svg/Remove';
import Modal from './Modal';
import RemovePopup from './RemovePopup';
import ScrollToTopRoute from './ScrollToTopRoute';

import base from '../base';

class App extends React.Component {
  constructor() {
    super();
    
    this.state = {
        bookLists: {},
        bookIDs: [],
        bookView: false,
        showList: {
            isActive: false,
            index: 0
          },
        showBookMenu: {
            isActive: false,
            index: 0
          },
        searchResults: [],
        isFetching: false,
        showModal: false,
        showFullDesc: false,
        showHeader: false,
        showBookMenuMoveList: false,
        isRemovePopupVisible: false,
        fixListPicker: false
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
      
    this.ref = base.syncState('searchResults', 
      {
        context: this,
        state: 'searchResults',
        defaultValue: []
      });
  }
  
  componentWillUnmount() {
    base.removeBinding(this.ref);
    window.removeEventListener('scroll', this.headerScroll);
    window.removeEventListener('scroll', this.listPositionScroll);
  }
  
  componentDidMount() {
    window.addEventListener('scroll', this.headerScroll);
    window.addEventListener('scroll', this.listPositionScroll);
  }
  
  componentDidUpdate() {
    this.ensureSelectedList();
  }

  headerScroll = (e) => {
    if(window.didScrollHeader) return;
    let scrollTop = window.scrollY;
    if(scrollTop > 165) {
      this.setState({ showHeader: true })
    } else {
      this.setState({ showHeader: false })
    }
    window.didScrollHeader = true;
  };
  
  listPositionScroll = (e) => {
    if(window.didScrollListPicker) return;
    if(window.innerWidth < 800) return;
    let scrollTop = window.scrollY;
    if(scrollTop > 210) {
      this.setState({ fixListPicker: true })
    } else {
      this.setState({ fixListPicker: false })
    }
    window.didScrollListPicker = true;
  };
  
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
    let currList;
    let currListName =  
      Object
        .keys(this.state.bookLists)
        .find(list => {
          currList = this.state.bookLists[list] 
            ? this.state.bookLists[list].selected 
            : false;
          return currList;
        });
        
    if(!currListName) {
      currListName = 'To Read';
    }
    
    return this.state.bookLists[currListName]
      ? this.state.bookLists[currListName]
      : {};
  };

  ensureSelectedList = () => {
    const bookLists = {...this.state.bookLists};
    let listSelected;
    for(const list in bookLists) {
      if(bookLists[list] && bookLists[list].selected) {
        if(listSelected) {
          bookLists[list].selected = false;
        } else {
          listSelected = true;
        }
      }
    }

    if(!listSelected) {
      bookLists['To Read'].selected = true;
    }
  };
  
  toggleSelected = (listName) => {
    const bookLists = {...this.state.bookLists};
    let list = bookLists[listName];
    if(!list) return;
    list.selected = !list.selected;
    
    this.setState(newState => {
      return {bookLists: newState.bookLists};
    });
  };
  
  createList = (listName) => {
    if(this.state.showBookMenu.isActive) {
      this.toggleBookMenu();
    }

    const bookLists = {...this.state.bookLists};
    bookLists[listName] = {
      listName: listName,
      selected: true,
      books: {}
    };
    
    this.setState(newState => {
      return {
        bookLists: update(newState.bookLists, {$set: bookLists})
      };
    });
  };
  
  removeList = (list) => {
    if(this.state.showBookMenu.isActive) {
      this.toggleBookMenu();
    }

    const selectedList = this.getCurrentList().listName;
    const currList = !list ? selectedList : list;
    const bookLists = {...this.state.bookLists};
    if(!this.doesListExist(bookLists, currList)) {
      return alert('list does not exist');
    }
    
    if(window.confirm(`Are you sure you want to remove your ${currList} shelf and all its books?`)) {
      let listToRemove = bookLists[currList];
      let ids = [];
      for (var id in listToRemove.books) {
        ids.push(id);
      }
      this.removeBookIDs(ids);
      
      bookLists[currList] = null;
      this.setState(newState => {
        return {
          bookLists: update(newState.bookLists, {$set: bookLists})
        };
      });
      
      if(!list || list === selectedList) {
        this.toggleSelected('To Read');
      }
      
      this.toggleRemovePopup();
      setTimeout(() => {
        this.toggleRemovePopup();
      }, 2500);
    }
  };
    
  switchList = (listName) => {
    if(this.state.showBookMenu.isActive) {
      this.toggleBookMenu();
    }
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
  
  toggleModal = () => {
    let showModal = this.state.showModal;
    showModal = !showModal;
    this.setState(newState => {
      return {
        showModal: update(newState.showModal, {$set: showModal})
      };
    });
  };
  
  toggleDesc = () => {
    let showFullDesc = this.state.showFullDesc;
    showFullDesc = !showFullDesc;
    this.setState(newState => {
      return {
        showFullDesc: update(newState.showFullDesc, {$set: showFullDesc})
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
          let books = this.state.bookLists[list].books;
          if(books && this.isBookInList(books, book.id)) {
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
  
  toggleBookMenu = (i=0) => {
    const showBookMenu = {...this.state.showBookMenu};
    showBookMenu.isActive = !showBookMenu.isActive;
    showBookMenu.index = i;
    this.setState(newState => {
      return {
        showBookMenu: update(newState.showBookMenu, {$set: showBookMenu})
      };
    });
  };

  toggleBookMenuMoveList = () => {
    let showBookMenuMoveList = this.state.showBookMenuMoveList;
    showBookMenuMoveList = !showBookMenuMoveList;
    this.setState(newState => {
      return {
        showBookMenuMoveList: update(newState.showBookMenuMoveList, {$set: showBookMenuMoveList})
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
  
  toggleRemovePopup = () => {
    let isRemovePopupVisible = this.state.isRemovePopupVisible;
    isRemovePopupVisible = !isRemovePopupVisible;
    this.setState({ isRemovePopupVisible });
  };
  
  render() {
    const Main = () => {
      const currList = this.getCurrentList().listName;
      
      const removeListHandler = (listToRemove) => {
        this.removeList(listToRemove);
      };
      
      return (
        <div className="main-wrapper">
          <SwitchListBtn 
            switchList={this.switchList}
            toggleSideList={this.toggleSideList}
            showList={this.state.showList}
            lists={this.state.bookLists}/>
          <div className="main-icon-wrapper">
            <div className="plus-icon-wrapper icon-wrapper" title="Create New List" onClick={() => this.toggleModal()}>
              New List <PlusIcon/>
            </div>
            {currList !== 'To Read' && currList !== 'Read'
              ? <div className="remove-icon-wrapper icon-wrapper" title="Remove List" onClick={() => removeListHandler()}>
                  Remove List <RemoveIcon/>
                </div>
              : null
            }
          </div>
          <div className="book-list-pane-wrapper">
            <ListPicker
              switchList={this.switchList}
              toggleSideList={this.toggleSideList}
              showList={this.state.showList}
              lists={this.state.bookLists}
              fixList={this.state.fixListPicker}
              toggleModal={this.toggleModal} 
              removeListHandler={removeListHandler} />
            <BookListPane 
              currentList={this.getCurrentList()}
              fixList={this.state.fixListPicker} 
              toggleBookMenu={this.toggleBookMenu}
              getAllLists={this.getAllLists}
              moveBook={this.moveBook}
              showBookMenuMoveList={this.state.showBookMenuMoveList}
              toggleBookMenuMoveList={this.toggleBookMenuMoveList}
              showBookMenu={this.state.showBookMenu} />
          </div>
          <Modal 
            toggleSelected={this.toggleSelected} 
            getCurrentList={this.getCurrentList} 
            createList={this.createList} 
            showModal={this.state.showModal}
            doesListExist={this.doesListExist}
            toggleModal={this.toggleModal}
            bookLists={this.state.bookLists} />
        </div>
      )
    };
    
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
        
        <Header
          path={this.props.location.pathname} 
          history={this.props.history} 
          setResults={this.setResults}
          toggleFetch={this.toggleFetch}
          showHeader={this.state.showHeader}
          toggleBookMenu={this.toggleBookMenu}
          isBookMenuActive={this.state.showBookMenu.isActive} />
        
        <Logo/>
        <SearchBar 
          path={this.props.location.pathname} 
          history={this.props.history} 
          setResults={this.setResults}
          toggleFetch={this.toggleFetch}
          toggleBookMenu={this.toggleBookMenu}
          isBookMenuActive={this.state.showBookMenu.isActive} />
        
        <RemovePopup
          isVisible={this.state.isRemovePopupVisible}
          message="List has Been Removed"/>
        
        <ScrollToTopRoute exact path="/" component={Main}/>
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
            toggleDesc={this.toggleDesc}
            showFullDesc={this.state.showFullDesc}
            removeBook={this.removeBook} />
        )}/>
      </div>
    )
  }
}

export default App;
