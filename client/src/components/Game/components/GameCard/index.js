import React, { Component } from 'react';
import CharacterSummary from '../CharacterSummary'
import LocationSummary from '../LocationSummary'

class Game extends Component {
	constructor(){
		super()
		this.state = {
			view: 'location',
			selectedCharacter: null
		}
	}

  render() {
  	let summary

  	if(this.state.view === 'location'){
  		summary = <LocationSummary location={this.props.playerState.currentLocation}/>
  	}else if (this.state.view === 'character'){
  		summary = <CharacterSummary character={this.state.selectCharacter}/>
  	}

    return (
      <div className="GameCard">
      	{summary}
      </div>
    );
  }
}

export default Game;