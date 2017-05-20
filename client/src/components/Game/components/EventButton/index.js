import React, { Component } from 'react';
import { connect } from 'react-redux';

import { createRoutine, startRoutine, endRoutine } from '../../../../actions/Game/routine'
import { openEventPopup, closeEventPopup } from '../../../../actions/Game/eventPopup'
import { craftItem, plantBug, removeBug, equipItem, unequipItem } from '../../../../actions/Game/item'
import { sneakThroughLocation, stealFromLocation, invadeLocation, goToLocaton, messageLocation } from '../../../../actions/Game/location'
import { attackCharacter, senseCharacter, recordCharacter, messageCharacter } from '../../../../actions/Game/character'

class EventButton extends Component {
  handleClick() {
    //basically whatever the event passed in is called, thats the one we call with the analysis tag set to true
    //some function wont even use an analysis tag, so im expressing that actions themselvs know if they will use a popup or not?
    //actions themselves KNOW if they have two purposes (analysis / event)// shouldnt this component know if it has a pop or not? even shouldnt that be in the design?... its such a large change that it doesnt really matter, it will require a huge shift anyways
    console.log("clickkkked", this.props)
    this.props[this.props.event](this.props, true)
  }

  render() {
    let event = this.props.event
    let text = event
    switch(event){
      case 'senseCharacter': 
        text = 'Sense ' + this.props.category
      break; 
      case 'createRoutine':
        switch(this.props.category){
          case 'guard':
            text = 'Guard'
          break;
          case 'herd': 
            text = 'Herd animals'
          break;
          case 'woodcut': 
            text = 'Cut wood'
          break;
          case 'mine':
            text = 'Mine ore'
          break;
          default:
            skill = event.substr(5).toLowerCase()
            text = 'Train ' + skill
          break;
        }
      break; 
    }
    return (
      <div onClick={this.handleClick.bind(this)}>
      {text}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {...ownProps}
}

const mapDispatchToProps = {
  createRoutine,
  startRoutine,
  endRoutine,
  openEventPopup,
  closeEventPopup,
  craftItem,
  plantBug,
  removeBug,
  equipItem,
  unequipItem,
  sneakThroughLocation,
  stealFromLocation,
  goToLocaton,
  invadeLocation, 
  messageLocation,
  attackCharacter,
  senseCharacter,
  recordCharacter,
  messageCharacter
}

export default connect(mapStateToProps, mapDispatchToProps)(EventButton);
