import React, { Component } from 'react';

import CharacterSummary from '../CharacterSummary'
import LocationSummary from '../LocationSummary'
import WorldSummary from '../WorldSummary'

import AbilityListItem from '../ListItems/ability'
import CharacterListItem from '../ListItems/character'
import ItemListItem from '../ListItems/item'
import LocationListItem from '../ListItems/location'
import RecordListItem from '../ListItems/record'
import SkillListItem from '../ListItems/skill'
import ChatListItem from '../ListItems/chat'

import EventButton from '../EventButton'
import EventPopup from '../EventPopup'

import socket from '../../../../actions/socket'

class GameCard extends Component {
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

  componentWillMount(){
    this.goToWorldSummary()
  }

	goToCharacterSummary(character) {
		let state = this.state
		state.summaryView = 'character'
		state.selectedCharacter = character
		this.setState(state)
	}

  goToWorldSummary(){
    let state = this.state
    state.summaryView = 'world'
    state.listView = 'locations'
    this.setState(state)
  }

  goToLocationSummary(){
    let state = this.state
    state.summaryView = 'location'
    this.setState(state)
  }

  selectLocation(location){
    let state = this.state
    state.selectedLocation = location
    this.setState(state)
  }

  selectItem(item){
    let state = this.state
    state.selectedItem = item
    this.setState(state)
  }


  render() {
  	if(!this.props.playerState && !this.props.worldState){
  		return (
  			<div>{'Loading...'}</div>
  		)
  	}

    let player = this.props.playerState
  	let currentLocation = player.currentLocation
  	let selectedCharacter = this.state.selectedCharacter
    let selectedItem = this.state.selectedItem
    let selectedLocation = this.state.selectedLocation
    let world = this.props.worldState

  	let summary
  	if(this.state.summaryView === 'location'){
  		summary = <LocationSummary location={currentLocation}/>
  	}else if (this.state.summaryView === 'character'){
  		summary = <CharacterSummary character={selectedCharacter}/>
  	}else if (this.state.summaryView === 'world'){
      summary = <WorldSummary {...this.props.worldState} />
    }

  	let list = []
  	if(this.state.listView === 'characters'){
  		list = currentLocation.characters.map((character) => {
  			return (
  				<CharacterListItem goToSummary={this.goToCharacterSummary.bind(this, character)} character={character}/>
  			)
  		})
  	}
    if(this.state.listView === 'locations'){
      list = world.locations.map((location) => {
        return (
          <LocationListItem select={this.selectLocation.bind(this, location)} location={location}/>
        )
      })
    }

    let events = []
    if(this.state.summaryView === 'world' && selectedLocation){
      events.push( <EventButton event='travelToLocation' onClick={this.goToLocationSummary} location={selectedLocation}></EventButton> )
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
            return <EventButton event='createRoutine' category={event} location={currentLocation}></EventButton>
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
            return <EventButton event='senseCharacter' category={event} character={selectedCharacter}></EventButton>
          break;
          case 'attack':
            return <EventButton event='attackCharacter' character={selectedCharacter}></EventButton>
          break;
          case 'record':
            return <EventButton event='recordCharacter' character={selectedCharacter}></EventButton>
          break;
          case 'plantBug':
            return <EventButton event='plantBug' character={selectedCharacter}></EventButton>
          break;  
          case 'unequip':
            return <EventButton event='unequipItem' item={selectedItem}></EventButton>
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

export default GameCard;