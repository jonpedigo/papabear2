import React, { Component } from 'react';
import HeaderTemplate from './template/header';
import FooterTemplate from './template/footer';

class App extends Component {
  render() {
    return (
      <div>
        <HeaderTemplate logo="Papa Bear: All For King" />

        <div className="container">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default App;
