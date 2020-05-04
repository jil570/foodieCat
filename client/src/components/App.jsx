// App.js is the root of our website.
// It is where all the components come together and work as a whole entity.

import React, { PureComponent } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './Login';
import Profile from './Profile';
import Register from './Register';
import EditInfo from './EditInfo';
import HomePage from './HomePage';
import HomeRest from './HomeRest';
import FindRestaurant from './FindRest';
import RecRestaurant from './RecRest';
import RouteProtector from './RouteProtector';
import RouteVerifier from './RouteVerifier';
import RestResult from './RestResult';
import Local from './Local';
import LocalRest1 from './LocalRest1';
import LocalRest2 from './LocalRest2';

class App extends PureComponent {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/login" component={RouteVerifier(Login)} />
          <Route exact path="/profile" component={RouteProtector(Profile)} />
          <Route exact path="/register" component={RouteVerifier(Register)} />
          <Route exact path="/editinfo" component={RouteProtector(EditInfo)} />
          <Route exact path="/findrestaurant" component={RouteProtector(FindRestaurant)} />
          <Route exact path="/findrestaurant/result" component={RouteProtector(RestResult)} />
          <Route exact path="/restaurant" component={RouteProtector(RecRestaurant)} />
          <Route exact path="/" component={RouteProtector(Profile)} />
          <Route exact path="/homepage" component={RouteProtector(HomePage)} />
          <Route exact path="/homepage/result" component={RouteProtector(HomeRest)} />
          <Route exact path="/local" component={RouteProtector(Local)} />
          <Route exact path="/local/reviewresult" component={RouteProtector(LocalRest1)} />
          <Route exact path="/local/topresult" component={RouteProtector(LocalRest2)} />
        </div>
      </Router>
    );
  }
}

export default App;
