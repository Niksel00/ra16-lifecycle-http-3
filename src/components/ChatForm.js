import { Component } from 'react';
import PropTypes from 'prop-types';

export default class ChatForm extends Component {
  state = { message: '' };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.addMessage(this.state.message);
    this.setState({ message: '' });
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <form className="ChatForm" onSubmit={this.handleSubmit}>
        <input
          className="ChatForm-input"
          onChange={this.handleChange}
          name="message"
          value={this.state.message}
          required
        />
        <button className="ChatForm-button">
          Отправить
        </button>
      </form>
    );
  }
}

ChatForm.propTypes = {
  addMessage: PropTypes.func.isRequired,
};