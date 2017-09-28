import React from 'react';
import PropTypes from 'prop-types';

import BookList from './BookList';
import Plus from './svg/Plus';

class ListPicker extends React.Component {

  componentDidMount() {
    if(this.props.newListInputActive) {
      this.newListName.focus();
    }
  }
  
  getNumbooks = (list, i) => {
    const { lists } = this.props;
    const numBooks = lists[list] && lists[list].books
      ? Object.keys(lists[list].books).length
      : 0;
    
    return <BookList 
            key={i}
            listName={list}
            listDisplayName={list}
            numBooks={numBooks}
            toggleSideList={this.props.toggleSideList}
            switchList={this.props.switchList}
            onMobile={this.props.onMobile} 
            removeListHandler={this.props.removeListHandler} 
            lists={this.props.lists} />;
  };

  newListSubmit = (e) => {
    e.preventDefault();

    if(!this.props.newListInputActive) {
      this.props.toggleNewListInput();
    }
    this.newListName.focus();
    
    if(!this.newListName.value) return;
    
    if(this.props.doesListExist(this.props.lists, this.newListName.value)) {
      return alert('list already exists');
    }
    
    const currList = this.props.getCurrentList();
    this.props.createList(this.newListName.value.trim());
    this.props.toggleSelected(currList.listName);

    this.props.toggleNewListInput();
  };
  
  render() {
    const { showList, newListInputActive, fixList } = this.props;
    const showClass = showList.isActive ? " show-list" : "";
    const activeClass = newListInputActive ? "active" : "";
    const posClass = fixList ? " list-picker-fixed" : "";
    
    let lists = Object.keys(this.props.lists);
    
    lists.forEach((list, i) => {
    	if(list === "Read" || list === "To Read") { 
    		lists.splice(i, 1);
        lists.unshift(list);
    	}
    });
      
    return (
      <div className={`app-list-picker-wrapper${posClass}`}>
        <div className={`app-list-picker${showClass}`}>
          <ul className="book-lists list-names">
            <li className="list-title">Switch List</li>
            {
              lists.map((list, i) => this.getNumbooks(list, i))
            }
          </ul>
        </div>
        <div className="add-list-wrapper">
          <form ref={(input) => this.newListForm = input} onSubmit={(e) => this.newListSubmit(e)}>
            <button className={activeClass} type="submit" title="create a new list">
              <Plus onDesktop={true}/>
            </button>
            <input className={activeClass} ref={(input) => this.newListName = input} type="text" placeholder="List Title" maxLength="30"/>
          </form>
        </div>
      </div>
    )
  }
}

ListPicker.propTypes = {
  lists: PropTypes.object.isRequired,
  toggleSideList: PropTypes.func.isRequired,
  showList: PropTypes.object.isRequired,
  switchList: PropTypes.func.isRequired,
  removeListHandler: PropTypes.func,
  doesListExist: PropTypes.func,
  toggleSelected: PropTypes.func,
  getCurrentList: PropTypes.func,
  createList: PropTypes.func,  
  onMobile: PropTypes.bool,
  fixList: PropTypes.bool,
  newListInputActive: PropTypes.bool,
  toggleNewListInput: PropTypes.func  
};

export default ListPicker;
