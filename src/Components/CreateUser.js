import React, { Component } from 'react';
import $ from 'jquery';
import '../CSS/form.css';
import Cookies from 'universal-cookie';
import { apiEndpoint } from '../constants.js'

const cookies = new Cookies();

class CreateUser extends Component {
  constructor(props) {
   super(props);
   this.state = {
     user:{
       username: "",
       password:"",
     },
     title: "Create Account",
     errorMessage:""
   };
  }

  submit(){
    let url;
    if (this.props.location.pathname === "/login"){
      url = `${apiEndpoint}/login/`
    } else {
      url = `${apiEndpoint}/users/`
    }
    let data = JSON.stringify({
      user:JSON.stringify(this.state.user)
    });
    $.ajax({
      url,
      type: 'POST',
      contentType: 'application/json',
      data,
      success: (d) => {
        //https://stackoverflow.com/questions/39826992/how-can-i-do-to-set-cookie-in-the-react-code?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
        if (d.success){
          cookies.set('userToken', d.message, { path: '/' });
          window.location = '/myrecipes';
        } else {
          this.setState({errorMessage:d.message})
        }

      }
    });
  }
  //https://stackoverflow.com/questions/23427384/get-form-data-in-reactjs?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
  handleUserNameChange(e) {
    let user = this.state.user
    user.username = e.target.value
    this.setState({user:this.state.user});
  }

  handlePasswordChange(e) {
    let user = this.state.user
    user.password = e.target.value
    this.setState({user:this.state.user});
  }

  componentWillMount() {
    if (this.props.location.pathname === "/login"){
      this.setState({title: "Login"})
    }
  }

  render() {

    return (
      <div className="form-container">
        <h1>{this.state.title}</h1>
          <p className="error-message">{this.state.errorMessage}</p>
        <div className="holder">
          <p className="title">Username:</p>
          <input value={this.state.user.username} onChange={this.handleUserNameChange.bind(this)} className="input"></input>
        </div>
        <div className="holder">
          <p id="instructions" className="title">Password:</p>
          <input type="password" value={this.state.user.password} onChange={this.handlePasswordChange.bind(this)} className="input"></input>
        </div>
        <div className="holder">
          <span className="form-right" ><span onClick={this.submit.bind(this)} className="button blue margin">Submit</span></span>
        </div>
      </div>

    );
  }
}

export default CreateUser;
