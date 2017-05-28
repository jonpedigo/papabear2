import React, { Component } from 'react';
import { connect } from 'react-redux';

import { createRoutine, startRoutine, endRoutine } from '../../../../actions/Game/routine'
import { openEventPopup, closeEventPopup } from '../../../../actions/Game/eventPopup'
import { craftItem, plantBug, removeBug, equipItem, unequipItem } from '../../../../actions/Game/item'
import { sneakThroughLocation, stealFromLocation, invadeLocation, travelToLocaton, messageLocation } from '../../../../actions/Game/location'
import { attackCharacter, senseCharacter, recordCharacter, messageCharacter } from '../../../../actions/Game/character'

class EventPopup extends Component {
  constructor(props){
    super(props)
    this.state = {}
    if(props.eventState.event === 'travelToLocation'){
      this.state.secondsRemaining = Math.ceil((props.eventState.travelTime - (Date.now() - props.eventState.travelStart))/1000)
    }
  }

  tick() {
    this.setState({secondsRemaining: this.state.secondsRemaining - 1});
    if (this.state.secondsRemaining <= 0) {
      clearInterval(this.interval)
      this.props.closeEventPopup()
    }
  }

  componentDidMount() {
    if(this.props.eventState.event === 'travelToLocation') this.interval = setInterval(this.tick.bind(this), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

	confirm(){
    //the acton itself will be in the props
		this.props[this.props.event](Object.assign({}, this.state, this.props), false)
	}

	exit(){
		this.props.closeEventPopup()
	}

  render_travelToLocation(){
    return (
      <div className='TravelToLocation'>
        {`Time Left: ${this.state.secondsRemaining} Seconds`}
      </div>
    )
  }

  render() {
    return (
      <div className='EventPopup-container'>
        <div className='EventPopup'>
          {this['render_' + this.props.eventState.event]()}
      	</div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  openEventPopup,
  closeEventPopup,
  plantBug,
  sneakThroughLocation,
  stealFromLocation,
  invadeLocation, 
  attackCharacter,
  senseCharacter
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
  	eventState: { ...state.eventState, ...ownProps.eventState }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventPopup);
