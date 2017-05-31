import React, { Component } from 'react';

class Message extends Component {
  render() {
    return (
      <div className="Message">
      	{`${this.props.message.author.name} ${this.props.message.author.family.name}: ${this.props.message.body}`}
      </div>
    );
  }
}

export default Message;