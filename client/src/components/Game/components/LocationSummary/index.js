import React, { Component } from 'react';

class LocationSummary extends Component {
  render() {
    if(!this.props.location) return (<div>{'Loading...'}</div>)

    let location = this.props.location
    return (
      <div className="LocationSummary">
      	{'Location Summary View'}
        {location.name}
      </div>
    );
  }
}

export default LocationSummary;