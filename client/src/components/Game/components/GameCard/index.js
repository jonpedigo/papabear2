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
      selectedLocation: null
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
    let player = this.props.playerState

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
      events.push( <EventButton event='goToLocation' location={selectedLocation}></EventButton> )
    }

    if(this.state.summaryView === 'location' && currentLocation){
      events = this.props.design.LOCATIONS[currentLocation.category].EVENTS.map((event) => {
        if(event.constructor == Function) event = event(player, currentLocation)
        switch(event){
          case 'trainWarfare': 
          case 'trainStealth': 
          case 'trainMagic': 
          case 'guard':
          case 'herd': 
          case 'woodcut': 
          case 'mine':
            let category = event
            if(event.indexOf('train') > -1) category = event.substr(5).toLowerCase()
            return <EventButton event='createRoutine' category={category} location={currentLocation}></EventButton>
          break;
          case 'sneak':
            return <EventButton event='sneakThroughLocation' location={currentLocation}></EventButton>
          break;
          case 'steal':
            return <EventButton event='stealFromLocation' location={currentLocation} item={selectedItem}></EventButton>
          break;
          case 'invade':
            return <EventButton event='invadeLocation' location={currentLocation}></EventButton>
          break;
          case 'equip':
            return <EventButton event='equipItem' item={selectedItem}></EventButton>
          break;  
          case 'unequip':
            return <EventButton event='unequipItem' item={selectedItem}></EventButton>
          break;  
          case 'craft':
            return <EventButton event='craftItem' item={selectedItem}></EventButton>
          break;  
        }
      })
    }

    if(this.state.summaryView === 'character' && selectedCharacter){
      events = this.props.design.CHARACTERS.EVENTS.map((event) => {
        if(event.constructor == Function) event = event(player, selectedCharacter)
        switch(event){
          case 'senseBug':
          case 'senseSkill':
          case 'senseCharm':
            let category = event.substr(5).toLowerCase()
            return <EventButton event='senseCharacter' category={category} character={selectedCharacter}></EventButton>
          break;
          case 'attack':
            return <EventButton event='attackCharacter' character={selectedCharacter}></EventButton>
          break;
          case 'record':
            return <EventButton event='recordCharacter' character={selectedCharacter}></EventButton>
          break;
          case 'removeBug':
            return <EventButton event='removeBug' character={selectedCharacter}></EventButton>
          break; 
          case 'plantBug':
            return <EventButton event='plantBug' character={selectedCharacter}></EventButton>
          break;     
        }
      })
    }

    return (
      <div className="GameCard">
      	{summary}
      	{list}
        {events}
      </div>
    );
  }
}

export default Game;