import React, { Component } from 'react';
import GameCard from './GameCard'
import { connect } from 'react-redux';


class Game extends Component {
  render() {
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
    game: state.game,
  };
}

export default connect(mapStateToProps)(Game);
