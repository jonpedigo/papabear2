import React, { Component } from 'react';
import GameCard from './GameCard'
import { connect } from 'react-redux';
import cookie from 'react-cookie';

class Game extends Component {
  render() {
    return (
      <div className="Game">
      	<GameCard {...this.props}></GameCard>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    kingdom: state.kingdom,
    player: state.game.player,
    game: state.game.game,
    family: state.game.family,
    playerState: state.game.playerState,
    metaState: state.game.metaState
  };
}

export default connect(mapStateToProps)(Game);
