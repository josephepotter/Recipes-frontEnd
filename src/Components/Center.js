import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import Create from './Create';
import MyRecipes from './MyRecipes';
import CreateUser from './CreateUser';
import Homepage from './Homepage'
//https://medium.com/@pshrmn/a-simple-react-router-v4-tutorial-7f23ff27adf

class Center extends Component {
  render() {
    return (
      <div className = "content content-center">
        <div className = "inner-content">
          <Router>
            <div className="full">
              <Route exact path="/" component={Homepage} />
              <Route path="/create" component={Create} />
              <Route path="/myrecipes" component={MyRecipes} />
              <Route path="/createaccount" component={CreateUser} name="create" />
              <Route path="/login" component={CreateUser} name="login" />
            </div>
          </Router>
        </div>
      </div>
    );
  }
}

export default Center;
