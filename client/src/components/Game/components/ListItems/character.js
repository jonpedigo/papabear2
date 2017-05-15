import React, { Component } from 'react';

class Game extends Component {
  render() {
    return (
      <div onClick={this.props.goToSummary} className="CharacterListItem">
        {this.props.character.name + " " + this.props.character.family.name}
      </div>
    );
  }
}

export default Game;