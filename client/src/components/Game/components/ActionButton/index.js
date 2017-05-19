import React, { Component } from 'react';
import { connect } from 'react-redux';

import { createAction, startAction, endAction } from '../../../../actions/Game/action'
import { openEventPopup, closeEventPopup } from '../../../../actions/Game/eventPopup'
import { craftItem, plantBug, removeBug, equipItem, unequipItem } from '../../../../actions/Game/item'
import { sneakIntoLocation, stealFromLocation, invadeLocation, goToLocaton, messageLocation } from '../../../../actions/Game/location'
import { attackCharacter, senseCharacter, recordCharacter, messageCharacter } from '../../../../actions/Game/character'

class ActionButton extends Component {
  handleClick() {
    //basically whatever the action passed in is called, thats the one we call with the analysis tag set to true
    this.props[this.props.event](this.props, true)
  }

  render() {
    return (
      <div onClick={this.handleClick.bind(this)}>
        {this.props.action}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {...ownProps}
}

const mapDispatchToProps = {
  createAction,
  startAction,
  endAction,
  openEventPopup,
  closeEventPopup,
  craftItem,
  plantBug,
  removeBug,
  equipItem,
  unequipItem,
  sneakIntoLocation,
  stealFromLocation,
  goToLocaton,
  invadeLocation, 
  messageLocation,
  attackCharacter,
  senseCharacter,
  recordCharacter,
  messageCharacter
}

//this is where you pass itemId, characterId, location+itemId...all of that which is needed by the post request

export default connect(mapStateToProps, mapDispatchToProps)(ActionButton);
