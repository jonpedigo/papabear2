import React, { Component } from 'react';

class CharacterSummary extends Component {
  render() {
    return (
      <div className="CharacterSummary">
        {'Character Summary View'}
        Name: {this.props.character.name + ' ' + this.props.character.family.name}
        Kingdom: {this.props.character.kingdom.name}
      </div>
    );
  }
}

export default CharacterSummary;