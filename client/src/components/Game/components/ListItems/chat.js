import React, { Component } from 'react';

class Game extends Component {
  render() {
  		console.log(this.props)

    return (
      <div>
        <div className="Game">
          {"WASSUP LETS PLAY"}
        </div>
      </div>
    );
  }
}

export default Game;