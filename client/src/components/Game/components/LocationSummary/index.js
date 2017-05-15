import React, { Component } from 'react';

class Game extends Component {
  render() {
    if(!this.props.location) return (<div>{'Loading...'}</div>)

    let location = this.props.location
    return (
      <div className="LocationSummary">
        {location.name}
      </div>
    );
  }
}

export default Game;