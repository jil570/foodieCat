import React, { Component } from 'react';
import '../stylesheets/uikit.min.css';
import profileimage from '../images/default-profile.png';
import '../stylesheets/friend-restaurant.css';

export default class FriendCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const titleStyle = {
            "height": "auto",
            "text-align": "center",
            "border-radius": "6px",
            "display":"inline-block"};

        return (
                <div className="row">
                    <h5 className="mx-auto" style={titleStyle}>My Friends</h5>
                    <div className="card m-3" style={{"border": "1px solid white"}}>
                        <img className="card-img-top" src={profileimage} alt="Profile Icon"></img>
                        <div className="card-body">
                            <h5 className="card-title">Chenyuan Li</h5>
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">Address:</li>
                            <li className="list-group-item">1st Preference:</li>
                            <li className="list-group-item">2nd Preference:</li>
                        </ul>
                    </div>
            </div>
        );
    }
}

