/* globals btoa */

import React, { Component } from 'react';
import NavBar from './NavBar';
import { getUser } from '../javascripts/userRequests';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      isLoading: true,
      mid_long: null,
      mid_lat: null,
    };
  }

  componentDidMount() {
    getUser()
      .then((data) => { 
        data.json()
          .then((userInfo) => {
            this.setState({ data: userInfo, isLoading: false });
          })
          .catch(() => {});
      })
      .catch(() => {});
  }

  render() {
    const { data, isLoading } = this.state;
    if (isLoading) {
      return (
        <div className="uk-cover-container uk-flex uk-flex-center uk-flex-middle">
          <h1>Wait a Sec...</h1>
        </div>
      );
    }

    let src = '';

    try {
      src = `data:image/png;base64,${btoa(String.fromCharCode.apply(null, data.image.data))}`;
    } catch (err) {
      src = '';
    }

    return (
      <div>
        <NavBar />
        <div className="uk-flex uk-flex-center uk-background-default">
          <div className="uk-container uk-container-small">
            <div className="uk-grid uk-margin-medium-bottom" uk-grid="true">
              <div className="uk-width-1-3 uk-flex uk-flex-middle uk-flex-center">
                <img className="uk-border-pill" style={{ maxHeight: '150px', maxWidth: '150px' }} id="profile-image" src={src} alt="" />
              </div>
              <div className="uk-section uk-section-default uk-padding-small uk-margin-left">
                <div className="uk-flex uk-margin-small-bottom uk-flex-row uk-flex-middle">
                  <h1 id="username" className="uk-text-light uk-margin-remove uk-heading-xsmall">{data.username}</h1>
                  <a className="uk-button uk-button-default uk-margin-left" style={{ height: '40px' }} href="/editinfo">Edit</a>
                </div>
                <ul className="uk-margin-remove" style={{ padding: '0px', listStyleType: 'none' }}>
                  <li className="uk-text-bold uk-margin-bottom uk-margin-right uk-float-left">
                    <span id="posts" className="uk-text-light">
                      First Name:
                      {' '}
                      {data.firstName}
                    </span>
                  </li>
                  <li className="uk-text-bold uk-margin-bottom uk-margin-left uk-margin-right uk-float-left">
                    <span id="followers" className="uk-text-light">
                      Last Name:
                      {' '}
                      {data.lastName}
                    </span>
                  </li>
                </ul>
              </div>
            <div className="uk-flex uk-margin-small-bottom uk-flex-row uk-flex-middle">
              <h2 id="username" className="uk-text-light uk-margin-remove uk-heading-xsmall"> Say Hi! {data.username} is currently at <a>{data.street}</a>, <a>{data.city}</a>, <a>{data.state}</a>.</h2>
            </div>
            <div className="uk-flex uk-margin-small-bottom uk-flex-row uk-flex-middle">
              <h2 id="username" className="uk-text-light uk-margin-remove uk-heading-xsmall"> {data.username} has a hearty appetite for <a>{data.category1}</a>, <a>{data.category2}</a> food</h2>
            </div>
            <div className="uk-flex uk-margin-small-bottom uk-flex-row uk-flex-middle">
              <h2 id="username" className="uk-text-light uk-margin-remove uk-heading-xsmall"> {data.username} 's current coordinate is (lat:<a>{parseFloat(data.latitude).toFixed(5)}</a>, lng:<a>{parseFloat(data.longitude).toFixed(5)}</a>) </h2>
            </div>
            <div className="uk-flex uk-margin-small-bottom uk-flex-row uk-flex-middle">
              <h2 id="username" className="uk-text-light uk-margin-remove uk-heading-xsmall"> {data.username} 's current profile status is <a>{data.status}</a>. </h2>
            </div>
           </div>
          </div>
        </div>
      </div>
      
    );
  }
}

export default Profile;
