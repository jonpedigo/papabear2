import React, { Component } from 'react';

class Location extends Component {
  render() {
    return (
      <div style={{color:this.props.location.kingdom.color}} onClick={this.props.select} className="Location">
        {`Name: ${this.props.location.name} Category: ${this.props.location.category} Kingdom: ${this.props.location.kingdom.name}`}
      </div>
    )
  }
}

export default Location;