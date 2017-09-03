import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';

class RemovePopup extends React.Component {  
  
  render() {
    let removePopup = this.props.isVisible 
      ? <div key={this.props.message} className="remove-popup">{this.props.message}</div>
      : null;
      
    return (
      <div>
        <CSSTransitionGroup
          transitionName="remove-list-popup"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={500}>
          {removePopup}
        </CSSTransitionGroup>
      </div>
    )
  }
}

RemovePopup.propTypes = {
  message: PropTypes.string.isRequired,
  isVisible: PropTypes.bool.isRequired
};

export default RemovePopup;
