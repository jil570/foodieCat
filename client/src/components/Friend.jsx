import React, { Component } from 'react';
import NavBar from './NavBar';
import { rgba } from 'polished';
import Searchbar from './Searchbar';
import FriendCard from './FriendCard';
import image from '../images/slide-5.jpg';
import Post from './Post';
import { getUser } from '../javascripts/userRequests';
import { getLikes } from '../javascripts/postRequests';
import {Tab, Tabs} from 'react-bootstrap';
import '../stylesheets/friend-restaurant.css';

class Friend extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recommendFriends: [{ "firstname": "Jialin", "lastname": "Lou", "address": "3900 City Ave.", "first": "Japanese", "second": "Chinese" }, { "firstname": "Yiwen", "lastname": "Tang", "address": "3910 City Ave.", "first": "Japanese", "second": "Chinese" }, { "firstname": "Yi-Nung", "lastname": "Huang", "address": "3920 City Ave.", "first": "Japanese", "second": "Chinese" }, { "firstname": "Chenyuan", "lastname": "Li", "address": "3930 City Ave.", "first": "Japanese", "second": "Chinese" }],
            friends: [{ "firstname": "Jialin", "lastname": "Lou", "address": "3900 Chestnut Ave.", "first": "Japanese", "second": "Chinese" }, { "firstname": "Yiwen", "lastname": "Tang", "address": "3910 Chestnut Ave.", "first": "Japanese", "second": "Chinese" }, { "firstname": "Yi-Nung", "lastname": "Huang", "address": "3920 Chestnut Ave.", "first": "Japanese", "second": "Chinese" }, { "firstname": "Chenyuan", "lastname": "Li", "address": "3930 Chestnut Ave.", "first": "Japanese", "second": "Chinese" }]
        }
    }

    render() {
        const titleStyle = {
            "height": "auto",
            "textAlign": "center",
            "borderRadius": "6px",
            "display": "block",
            "color": "#8b0000"
        };
        const { recommendFriends, friends } = this.state;
        const recommendFriendCards = [];
        const friendCards = [];

        recommendFriends.forEach((recommendFriend) => {
            console.log(recommendFriend);
            recommendFriendCards.push(<FriendCard id={"rfcard-" + ""} /*onClick={() => this.showRecommendFriends(user)}*/ fullname={recommendFriend.firstname + " " + recommendFriend.lastname} address={recommendFriend.address} first={recommendFriend.first} second={recommendFriend.second} />);
        });

        friends.forEach((friend) => {
            console.log(friend);
            friendCards.push(<FriendCard id={"rfcard-" + ""} /*onClick={() => this.showRecommendFriends(user)}*/ fullname={friend.firstname + " " + friend.lastname} address={friend.address} first={friend.first} second={friend.second} />);
        });

        return (
            <div>
                <NavBar />
                <div
                    id="slideshow"
                    className="uk-cover-container uk-background-secondary uk-flex uk-light uk-flex-center uk-flex-middle uk-height-viewport uk-background-cover"
                    data-uk-height-viewport="true"
                    style={{ backgroundImage: `url(${image})` }}
                >
                    <div className="col-sm-10 mx-auto p-4" style={{ backgroundColor: rgba(255, 255, 255, 0.4), "borderRadius": "6px" }}>
                        <Tabs defaultActiveKey="myFriend" id="myFriend-recFriend-tab">
                            <Tab eventKey="myFriend" title="My Friends">
                                <br />
                                <h5 className="mx-auto" style={titleStyle}>My Friends</h5>
                                <br />
                                <Searchbar search="Search My Friend" />
                                <br />
                                <div className="row">
                                    {friendCards}
                                </div>
                            </Tab>
                            <Tab eventKey="recFriend" title="New Friends">
                                <br />
                                <h5 className="mx-auto" style={titleStyle}>Recommend Friends</h5>
                                <br />
                                <Searchbar search="Search New Friend" />
                                <br />
                                <div className="row">
                                    {recommendFriendCards}
                                </div>
                            </Tab>
                        </Tabs>
                    </div>
                </div>
            </div>
        );
    }
}

export default Friend;
