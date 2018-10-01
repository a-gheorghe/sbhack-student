import React from 'react';
import logo from '../../images/logo.svg';
import instructor from '../../images/group-2@2x.png';

const Header = () => (
  <header className="App-header wrap">
    <img alt="code-canada-logo" src={logo} />
    <img className="instructor" alt="instructor" src={instructor} />
  </header>
);

export default Header;
