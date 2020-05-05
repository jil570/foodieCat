/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* globals */

import React, { Component } from 'react';
import NavBar from './NavBar';
import { getSuggestedUsers, getUser } from '../javascripts/userRequests';
import image from '../images/slide-1.jpg';
import { rgba } from 'polished';
import { Redirect } from 'react-router-dom';

class Friend extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      currentUser: null,
      isLoading: true,
      restaurants: [],
    };

    this.handleFollow = this.handleFollow.bind(this);
    this.calculateDistance = this.calculateDistance.bind(this);
    this.middlePoint = this.middlePoint.bind(this);
  }

  componentDidMount() {
    getUser()
      .then((data) => {
        data.json()
          .then((userInfo) => {
            this.setState({ currentUser: userInfo});
          })
          .catch(() => {});
      })
      .catch(() => {})
      .then(() => {
        getSuggestedUsers()
          .then((data) => {
            data.json()
              .then((usersInfo) => {
                this.setState({ data: usersInfo });
                this.setState({ isLoading: false });
              })
              .catch(() => {});
          })
          .catch(() => {});
      });
  }

  calculateDistance(lat1, lon1, lat2, lon2){
    console.log(lat1);
    //https://www.geodatasource.com/developers/javascript
    //This formula to calculate distance of 2 points given their coordinatess
    if ((lat1 == lat2) && (lon1 == lon2)) {
      return 0;
    }
    else {
      var radlat1 = Math.PI * lat1/180;
      var radlat2 = Math.PI * lat2/180;
      var theta = lon1-lon2;
      var radtheta = Math.PI * theta/180;
      var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = dist * 180/Math.PI;
      dist = dist * 60 * 1.1515;
      dist = dist * 1.609344 
      return dist.toFixed(3);
    }
  }

  middlePoint(lat1, lng1, lat2, lng2) {
    Math.degrees = function(rad) {
        return rad * (180 / Math.PI);
    }
    Math.radians = function(deg) {
        return deg * (Math.PI / 180);
    }
    lat1 = Math.radians(lat1);
    lng1 = Math.radians(lng1);
    lat2 = Math.radians(lat2);
    var lng = Math.radians(lng2);
    var bx = Math.cos(lat2) * Math.cos(lng - lng1)
    var by = Math.cos(lat2) * Math.sin(lng - lng1)
    var lat3 = Math.atan2(Math.sin(lat1) + Math.sin(lat2), Math.sqrt((Math.cos(lat1) + bx) * (Math.cos(lat1) + bx) + Math.pow(by, 2)));
    var lon3 = lng1 + Math.atan2(by, Math.cos(lat1) + bx);
    return [Math.degrees(lat3), Math.degrees(lon3)]
}

  handleFollow(event) {
    event.preventDefault();
    
    const { currentUser } = this.state;
    
    const longitude = event.target.getAttribute('log');
    const latitude = event.target.getAttribute('lat');
    const person2_cat1 = event.target.getAttribute('cat1'); 

    const midpoint_arr = this.middlePoint(currentUser.latitude, currentUser.longitude, latitude, longitude);

    fetch("http://localhost:9000/recommendations/" + midpoint_arr[0] + '/' + midpoint_arr[1] + '/' + currentUser.category1 + '/' + person2_cat1,
    {
        method: "GET"
    }).then(res => {
        console.log(res);
        return res.json();
    }, err => {
        console.log(err);
    }).then(restaurantList => {
        console.log(restaurantList);
        //This saves our HTML representation of the data into the state, which we can call in our render function
        if (restaurantList.length === 0) {
          alert("We're sorry that there is no restaurant matching your choices :( \nPlease try another combination.")
        } else {
          this.setState({
              restaurants: restaurantList
          });}
    });
  }

  render() {
    const { data, isLoading, currentUser } = this.state;

    if (isLoading) {
      return (
        <div className="uk-cover-container uk-flex uk-flex-center uk-flex-middle">
          <h1>Wait a Sec...</h1>
        </div>
      );
    }

    let key = 0;
    const recommends = data.map((name) => {
      //Remove currentUser and Unsets
      if (name.username !== currentUser.username && name.street !== "unset") {
        const content = (
            <div className="uk-border-rounded uk-margin uk-width-3-4 uk-padding-large uk-position-z-index" uk-scrollspy="cls: uk-animation-fade" style={{ backgroundColor: rgba(0, 0, 0, 0.7) }}>
              <h3 className="uk-card-title"><a className="uk-text-warning">{name.username}</a></h3>
              <span>
                <p>{name.username} {' '} is currently at <span className="uk-text-warning">{name.street}, {name.city}, {name.state}</span>.</p> {' '}
                <p>{name.username} likes  <span className="uk-text-warning">{name.category1}, {name.category2}</span> food.</p>
                <p>The distance between you and {name.username} is  <span className="uk-text-warning">{this.calculateDistance(name.latitude, name.longitude, currentUser.latitude, currentUser.longitude)}</span> km.</p>
                <button id={name.username} log={name.longitude} lat = {name.latitude} cat1 = {name.category1} cat2 = {name.category2} type="button" onClick={this.handleFollow} className="uk-button uk-button-danger"> Recommend for US!! </button>
              </span>
            </div>
        );

        key += 1;

        return content;
      }

      return '';
    });
    console.log(data);

    return (
      <div>
       <NavBar />
        <div
            id="slideshow"
            className="uk-cover-container uk-background-secondary uk-flex uk-flex uk-flex-center uk-flex-middle uk-light uk-height-viewport uk-background-cover"
            data-uk-height-viewport="true"
            style={{ backgroundImage: `url(${image})` }}
        >
        <div className="uk-border-rounded uk-width-3-4 uk-padding-large uk-position-z-index" uk-scrollspy="cls: uk-animation-fade" style={{ backgroundColor: rgba(0, 0, 0, 0.7)}}>
          <h2 className="uk-text-center uk-text-uppercase"><span>Find a Friend</span></h2>
            <div className="uk-container uk-container-small">
            <h3>Hello, {currentUser.username}! Meet some peer foodies.</h3>
              {recommends}
            </div>
                {this.state.restaurants.length > 0 &&
                  <Redirect to={{
                        pathname: '/friend/result',
                        state: { 
                          results: this.state.restaurants 
                        }
                  }} />}
          </div>
        </div>
      </div>
    );
  }
}

export default Friend;
