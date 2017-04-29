import React, { Component } from 'react';
import { Link } from 'react-router';

class Navigation extends Component {
  render() {
    return (
      <div className='Navigation'>
        <Link to='game/action'>Action</Link>
        <Link to='game/location/red_castle'>Location</Link>
        <Link to='game/character/sonofjon'>Character</Link>
      </div>
    );
  }
}

export default Navigation;