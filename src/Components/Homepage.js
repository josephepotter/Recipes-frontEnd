import React, { Component } from 'react';
import $ from 'jquery';

class Homepage extends Component {
  constructor(props) {
   super(props);
   this.state = {
     count: 3,
     position: 0
   };
  }
  moveLeft() {
    let track = $(".banner-track");
    let position = this.state.position;
    position--;
    if(position < 0){
      position = 0
    }
    let newLeft = position * (-100);
    this.setState({position:position});
    //https://stackoverflow.com/questions/1806246/jquery-move-element-by-relative-value?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
    track.css({
      left: newLeft + '%'
    });

  }
  moveRight() {
    let track = $(".banner-track");
    let position = this.state.position;
    position++;
    if(position > (this.state.count -1)){
      position = this.state.count -1;
    }
    let newLeft = position * (-100);
    this.setState({position:position});
    track.css({
      left: newLeft + '%'
    });
  }
//bhttps://medium.com/@pshrmn/a-simple-react-router-v4-tutorial-7f23ff27adf
  render() {
    return (
      <div>
        <div className="banner">
          <div className="banner-side" onClick={this.moveLeft.bind(this)}>
          </div>
          <div className="banner-middle">
            <p className="all-title">Welcome to your online recipe store!</p>
            <div className="banner-track">
              <span className="item">
                <img className="item-image shadow" src="/Images/burrito-chicken-delicious-461198.jpg"/>
              </span>
              <span className="item">
                <img className="item-image shadow" src="/Images/meat-vegetables-gemuesepiess-mushrooms-111131.jpeg"/>
              </span>
              <span className="item">
                <img className="item-image shadow" src="/Images/pexels-photo-221143.jpeg"/>
              </span>
            </div>
          </div>
          <div className="banner-side" onClick={this.moveRight.bind(this)}>
          </div>
        </div>
      </div>
    );
  }
}

export default Homepage;
