import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <div className = "header">
        <img className="header-image" src="/R.png"/>
        <span className="header-line-height">Personal Recipe Store<span className = "smaller"> | Store all your Recipes online!</span></span>
      </div>
    );
  }
}

export default Header;
