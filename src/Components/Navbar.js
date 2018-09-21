import React, { Component } from 'react';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

class Navbar extends Component {
  constructor(props) {
   super(props);
   this.state = {
     login: (cookies.get('userToken')) ? false : true
   };
  }
   signout() {
     cookies.remove('userToken',{ path: '/' });
     window.location = '/login'
   }
  render() {
    //https://reactjs.org/docs/conditional-rendering.html
    const signin = this.state.login ? (
      <span className = "right">
        <a href = "/createaccount" className = "navElem sizer"><i className="material-icons nav-icon">account_circle</i> Create Account</a>
        <a href = "/login" className = "navElem last sizer">sign in</a>
      </span>
    ) : (
      <span className = "right">
        <a onClick={this.signout.bind(this)} className = "navElem last sizer"><i className="material-icons nav-icon">account_circle</i> sign out</a>
      </span>
    );
    return (
      <div className = "navBar rounded shadow">
        <a href = "/" id = "home" className = "navElem">Home</a>
        <span  id = "navButton" className = "navElem">&#9776;</span>
        <span className = "toggle">
            <a href = "/create" className = "navElem sizer">Create</a>
            <a href = "/myrecipes" className = "navElem sizer">My Recipes</a>

              {signin}

        </span>
      </div>
    );
  }
}

export default Navbar;
