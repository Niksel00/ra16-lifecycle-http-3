import { Component, createRef } from 'react';
import ChatForm from './ChatForm';
import ChatMessage from './ChatMessage';
import { nanoid } from 'nanoid';

const serverURL = 'http://localhost:7777/messages';

export default class Chat extends Component {
  state = { messages: [], waiting: false };
  messagesElement = createRef();

  componentDidMount() {
    this.setMyId();

    this.interval = setInterval(() => {
      this.getData();
    }, 3000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  setMyId() {
    let hasId = localStorage.getItem('userId');
    if (!hasId) {
      hasId = nanoid();
      localStorage.setItem('userId', hasId);
    }
    this.userId = hasId;
  }

  getData = () => {
    let id = 0;
    const countMessages = this.state.messages.length;
    if (countMessages) {
      id = this.state.messages[countMessages - 1].id;
    }
    fetch(`${serverURL}?from=${id}`)
      .then(response => response.json())
      .then(result => {
        this.setState(prevState => ({
          messages: [...prevState.messages, ...result],
          waiting: false,
        }));

        if (result.length > 0) {
          this.scrollChat();
        }
      });
  }

  sendData = (content) => {
    const data = JSON.stringify({ userId: this.userId, content });
    fetch(serverURL, {
      method: 'POST',
      body: data,
    })
      .then(() => {
        this.setState({ waiting: true })
        this.scrollChat();
      });
  }

  scrollChat = () => {
    this.messagesElement.current.scrollTop =
      this.messagesElement.current.scrollHeight - this.messagesElement.current.getBoundingClientRect().height;
  }

  render() {
    return (
      <div className="Chat">
        <div className="Chat-messages" ref={this.messagesElement}>
          {this.state.messages.map((message) =>
            <ChatMessage
              key={message.id}
              content={message.content}
              myMessage={message.userId === this.userId}
            />
          )}
          {this.state.waiting && <div className="ChatMessage Chat-waiting">Отправляется...</div>}
        </div>
        <ChatForm addMessage={this.sendData} />
      </div>
    );
  }
}