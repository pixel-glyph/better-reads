import React from 'react';
import PropTypes from 'prop-types';

import Overlay from './Overlay';

class Modal extends React.Component {
  
  componentDidMount() {
    this.newListName.focus();
  }
  
  newListSubmit = (e) => {
    e.preventDefault();
    if(!this.newListName.value) return;
    this.props.createList(this.newListName.value);
    this.props.toggleModal();
  };
  
  render() {
    const showClass = this.props.showModal ? " show-modal" : "";
    return (
      <div>
        <div className={`modal${showClass}`}>
          <div className="modal-input-wrapper">
            <h1>Create New List</h1>
              <form ref={(input) => this.newListForm = input} onSubmit={(e) => this.newListSubmit(e)}>
                <input ref={(input) => this.newListName = input} type="text" placeholder="List Title" />
                <button type="submit">Add List</button>
              </form>
          </div>
        </div>
        <Overlay 
          toggle={this.props.toggleModal} 
          showOverlay={this.props.showModal}/>
      </div>
    )
  }
}

Modal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
  createList: PropTypes.func.isRequired
};

export default Modal;
