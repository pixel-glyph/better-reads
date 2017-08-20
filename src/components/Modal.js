import React from 'react';
import PropTypes from 'prop-types';

import Overlay from './Overlay';

class Modal extends React.Component {
  
  render() {
    const showClass = this.props.showModal ? " show-modal" : "";
    return (
      <div>
        <div className={`modal${showClass}`}>
          <p>Yo</p>
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
  toggleModal: PropTypes.func.isRequired
};

export default Modal;
