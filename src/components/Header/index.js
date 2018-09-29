import React, { Component } from 'react';
import logo from '../../images/logo.svg';
import '../../App.css';

class Header extends Component {
  render() {
    return (
      <header className="App-header">
        <img alt="code-canada-logo" src={logo} />
      </header>
    );
  }
}


export default Header;
