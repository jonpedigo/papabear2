import React, { Component } from 'react'
import { connect } from 'react-redux'

import { messageLocation } from '../../../../actions/Game/location'
import { messageCharacter } from '../../../../actions/Game/character'

const ENTER_KEY = 13

class EventPopup extends Component {
  constructor(props){
    super(props)
    this.state = { body: '' }
    this._handleKeyDown = this._handleKeyDown.bind(this)
  }

  _handleKeyDown (event){
    switch( event.keyCode ) {
      case ENTER_KEY:
        if(this.props.recipientModel === 'location'){
          this.props.messageLocation({body: this.state.body, location: this.props.location})
        }else if(this.props.recipientModel === 'character'){
          this.props.messageCharacter({body: this.state.body, location: this.props.character})
        }
        let state = this.state
        state.body = ''
        this.setState(state)
        break;
    }
  }

  updateBody (event){
    var state = this.state
    state.body = event.target.value
    this.setState(state)
  }

  componentWillMount(){
    document.addEventListener("keydown", this._handleKeyDown)
  }

  componentWillUnmount(){
    document.removeEventListener("keydown", this._handleKeyDown)
  }

  render() {
    return (
      <div className='ChatInput'>
        <input value={this.state.body} onChange={(e) => this.updateBody(e)}/>
      </div>
    )
  }
}

const mapDispatchToProps = {
  messageLocation,
  messageCharacter
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventPopup)
