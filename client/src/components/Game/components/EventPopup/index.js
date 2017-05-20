import React, { Component } from 'react';
import { connect } from 'react-redux';

import { createRoutine, startRoutine, endRoutine } from '../../../../actions/Game/routine'
import { openEventPopup, closeEventPopup } from '../../../../actions/Game/eventPopup'
import { craftItem, plantBug, removeBug, equipItem, unequipItem } from '../../../../actions/Game/item'
import { sneakThroughLocation, stealFromLocation, invadeLocation, goToLocaton, messageLocation } from '../../../../actions/Game/location'
import { attackCharacter, senseCharacter, recordCharacter, messageCharacter } from '../../../../actions/Game/character'

class EventPopup extends Component {
  constructor(props){
    super(props)
    this.state = {}
  }

	confirm(){
    //the acton itself will be in the props
		this.props[this.props.event](Object.assign({}, this.state, this.props), false)
	}

	exit(){
		this.props.closeEventPopup()
	}

  render() {
    return (
      <div className="EventPopup-container">
        <div className="EventPopup">
      
      	</div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  openEventPopup,
  closeEventPopup,
  plantBug,
  removeBug,
  sneakThroughLocation,
  stealFromLocation,
  invadeLocation, 
  attackCharacter,
  senseCharacter
}

const mapStateToProps = (state, ownProps) => {
  return {
  	eventState: state.eventState,
  	...ownProps
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventPopup);
