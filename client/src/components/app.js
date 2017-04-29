import React, { Component } from 'react';
import HeaderTemplate from './template/header';
import FooterTemplate from './template/footer';

class App extends Component {
  render() {
    return (
      <div>
        <HeaderTemplate logo="Papa Bear 2" />

        <div className="container">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default App;
