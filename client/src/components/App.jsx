// App.js is the root of our website.
// It is where all the components come together and work as a whole entity.

import React, { PureComponent } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './Login';
import Profile from './Profile';
import Register from './Register';
import EditInfo from './EditInfo';
import HomePage from './HomePage';
import RouteProtector from './RouteProtector';
import RouteVerifier from './RouteVerifier';

class App extends PureComponent {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/login" component={RouteVerifier(Login)} />
          <Route exact path="/profile" component={RouteProtector(Profile)} />
          <Route exact path="/register" component={RouteVerifier(Register)} />
          <Route exact path="/editinfo" component={RouteProtector(EditInfo)} />
          <Route exact path="/" component={RouteProtector(Profile)} />
          <Route exact path="/homepage" component={RouteProtector(HomePage)} />
        </div>
      </Router>
    );
  }
}

export default App;
