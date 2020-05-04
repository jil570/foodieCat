/* eslint-disable global-require */
/* globals */
import React, { PureComponent } from 'react';
import '../stylesheets/nav-bar.css';

class NavBar extends PureComponent {
  render() {
    return (
      <header className="uk-margin-small-bottom" style={{ backgroundColor: '#fff', borderBottom: '1px solid #dbdbdb' }} data-uk-sticky={{ 'show-on-up': 'true', animation: 'uk-animation-fade' }}>
        <div className="uk-container uk-container-small">
          <nav id="navbar" data-uk-navbar={{ mode: 'click' }}>
            <div className="uk-navbar-left">
              <a className="uk-navbar-item uk-logo" href="/"><img src={require('../images/logo.png')} alt="Logo" style={{ width: '60px', height: '60px' }} /></a>
            </div>
            <div className="uk-navbar-right">
              <ul className="uk-navbar-nav">
                <li>
                  <a className="tooltip" href="/homepage" data-uk-icon="icon:home">
                    <span className="tooltiptext">Home</span>
                  </a>
                </li>
                <li>
                  <a className="tooltip" href="/findrestaurant" data-uk-icon="icon:search">
                    <span className="tooltiptext">Find Restaurant</span>
                  </a>
                </li>
                <li>
                  <a className="tooltip" href="/local" data-uk-icon="icon:heart">
                      <span className="tooltiptext">Likes</span>
                  </a>
                </li>
                <li>
                  <a className="tooltip" href="/profile" data-uk-icon="icon:user"> 
                    <span className="tooltiptext">Profile</span>
                  </a>
                </li>
                <li>
                  <a className="tooltip" href="/editinfo" data-uk-icon="icon:image"> 
                    <span className="tooltiptext">Edit Profile</span>
                  </a>
                </li>
                <li>
                  <a className="tooltip" href="/restaurant" data-uk-icon="icon:location"> 
                    <span className="tooltiptext">Restaurant</span>
                  </a>
                </li>
                <li>
                  <a className="tooltip" href="/friend" data-uk-icon="icon:users">
                    <span className="tooltiptext">Friend</span>
                  </a>
                </li>
                <li>
                  <a className="tooltip" href="/login" data-uk-icon="icon:sign-out" uk-toggle="true"> 
                    <span className="tooltiptext">Log Out</span>
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </header>
    );
  }
}

export default NavBar;
