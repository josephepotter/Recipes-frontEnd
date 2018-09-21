import React, { Component } from 'react';
import Header from './Components/Header'
import Navbar from './Components/Navbar';
import Center from './Components/Center';
import Footer from './Components/Footer';

class App extends Component {
  render() {
    return (
      <div>
        <Header/>
        <Navbar/>
          <Center/>
        <Footer/>
      </div>
    );
  }
}

export default App;
