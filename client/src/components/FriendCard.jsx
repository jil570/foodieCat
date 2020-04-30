import React, { Component } from 'react';
import '../stylesheets/uikit.min.css';
import profileimage from '../images/default-profile.png';
import '../stylesheets/friend-restaurant.css';

export default class FriendCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className="card col-sm-2 m-3 p-3" style={{ "border": "1.5px solid #e75480", "color":"#e75480" }}>
                <img className="card-img-top" src={profileimage} alt="Profile Icon"></img>
                <div className="card-body">
                    <h5 style={{ "color": "#8b0000"}}className="card-title">{this.props.fullname}</h5>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Address: {this.props.address}</li>
                    <li className="list-group-item">1st Preference: {this.props.first}</li>
                    <li className="list-group-item">2nd Preference: {this.props.second}</li>
                </ul>
            </div>
        );
    }
}

