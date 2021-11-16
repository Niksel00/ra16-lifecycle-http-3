import { Component } from 'react';
import PropTypes from 'prop-types';

export default class ChatMessage extends Component {
  render() {
    const myMessageClass = this.props.myMessage ? ' ChatMessage-myMessage' : '';
    return (
      <div className={"ChatMessage" + myMessageClass}>
        {this.props.content}
      </div>
    );
  }
}

ChatMessage.propTypes = {
  content: PropTypes.string.isRequired,
  myMessage: PropTypes.bool,
};

ChatMessage.defaultProps = {
  myMessage: false,
}