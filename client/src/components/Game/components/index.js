import React, { Component } from 'react';
import GameCard from './GameCard'
import { connect } from 'react-redux';
import cookie from 'react-cookie';

class Game extends Component {
  render() {
    console.log("COOKIE!", cookie.load('user'), this.props)
    return (
      <div>
        <div className="Game">
        	<GameCard></GameCard>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    kingdom: state.kingdom,
    player: state.game.player,
    game: state.game.game,
    famimy: state.game.family,
    playerState: state.game.playerState,
  };
}

export default connect(mapStateToProps)(Game);
