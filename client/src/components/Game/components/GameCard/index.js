import React, { Component } from 'react';

import CharacterSummary from '../CharacterSummary'
import LocationSummary from '../LocationSummary'

import AbilityListItem from '../ListItems/ability'
import CharacterListItem from '../ListItems/character'
import ItemListItem from '../ListItems/item'
import LocationListItem from '../ListItems/location'
import RecordListItem from '../ListItems/record'
import SkillListItem from '../ListItems/skill'
import ChatListItem from '../ListItems/chat'

import ActionButton from '../ActionButton'

import EventPopup from '../EventPopup'


class Game extends Component {
	constructor(){
		super()
		this.state = {
			summaryView: 'location',
			listView: 'characters',
			selectedCharacter: null,
      selectedItem: null
    }
	}

	goToCharacterSummary(character) {
		let state = this.state
		state.summaryView = 'character'
		state.selectedCharacter = character
		this.setState(state)
	}

  render() {
  	if(!this.props.playerState){
  		return (
  			<div>{'Loading...'}</div>
  		)
  	}

  	let currentLocation = this.props.playerState.currentLocation
  	let selectedCharacter = this.state.selectedCharacter
    let selectedItem = this.state.selectedItem

  	let summary
  	if(this.state.summaryView === 'location'){
  		summary = <LocationSummary location={currentLocation}/>
  	}else if (this.state.summaryView === 'character'){
  		summary = <CharacterSummary character={selectedCharacter}/>
  	}

  	let list
  	if(this.state.listView === 'characters'){
  		list = currentLocation.characters.map((character) => {
  			return (
  				<CharacterListItem goToSummary={this.goToCharacterSummary.bind(this, character)} character={character}/>
  			)
  		})
  	}

    let actions
    if(this.state.summaryView === 'location'){
      console.log(this.props.design.LOCATIONS[currentLocation.category])
      actions = this.props.design.LOCATIONS[currentLocation.category].ACTIONS_AVAILABLE.map((action) => {
        switch(action){
          case 'sneak':
              return <ActionButton action='sneakIntoLocation' locationId={currentLocation._id}></ActionButton>
            break;
          case 'steal':
              return <ActionButton action='stealFromLocation' locationId={currentLocation._id} itemId={selectedItem._id}></ActionButton>
            break;
        }
      })
    }

    return (
      <div className="GameCard">
      	{summary}
      	{list}
      </div>
    );
  }
}

export default Game;