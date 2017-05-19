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

import EventButton from '../EventButton'

import EventPopup from '../EventPopup'


class Game extends Component {
	constructor(){
		super()
		this.state = {
			summaryView: 'location',
			listView: 'characters',
			selectedCharacter: null,
      selectedItem: null,
      selectedLocation
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
    let selectedLocation = this.state.selectedLocation

  	let summary
  	if(this.state.summaryView === 'location'){
  		summary = <LocationSummary location={currentLocation}/>
  	}else if (this.state.summaryView === 'character'){
  		summary = <CharacterSummary character={selectedCharacter}/>
  	}

  	let list = []
  	if(this.state.listView === 'characters'){
  		list = currentLocation.characters.map((character) => {
  			return (
  				<CharacterListItem goToSummary={this.goToCharacterSummary.bind(this, character)} character={character}/>
  			)
  		})
  	}

    let events = []
    if(this.state.summaryView === 'world' && selectedLocation){
      events.push( <EventButton Event='goToLocation' locationId={selectedLocation._id}></EventButton> )
    }

    if(this.state.summaryView === 'location' && currentLocation){
      events = this.props.design.LOCATIONS[currentLocation.category].EVENTS.map((event) => {
        if(event.constructor == Function) event = event(this.props.playerState, currentLocation)
        switch(Event){
          case 'sneak':
              return <EventButton event='sneakThroughLocation' locationId={currentLocation._id}></EventButton>
            break;
          case 'steal':
              return <EventButton event='stealFromLocation' locationId={currentLocation._id} itemId={selectedItem ? selectedItem._id : null}></EventButton>
            break;
          case 'invade':
              return <EventButton event='invadeLocation' locationId={currentLocation._id}></EventButton>
            break;      
        }
      })
    }

    if(this.state.summaryView === 'character' && selectedCharacter){
      events = this.props.design.CHARACTERS.EVENTS.map((event) => {
        if(event.constructor == Function) event = event(this.props.playerState, selectedCharacter)
        switch(event){
          case 'steal':
              return <EventButton event='stealFromLocation' locationId={currentLocation._id} itemId={selectedItem ? selectedItem._id : null}></EventButton>
            break;
          case 'invade':
              return <EventButton event='stealFromLocation' locationId={currentLocation._id}></EventButton>
            break;
          case 'bug':
              return <EventButton event='stealFromLocation' locationId={currentLocation._id}></EventButton>
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