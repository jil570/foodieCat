import React, { Component } from 'react';
import NavBar from './NavBar';
import Searchbar from './Searchbar';
import FriendCard from './FriendCard';
import Post from './Post';
import { getUser } from '../javascripts/userRequests';
import { getLikes } from '../javascripts/postRequests';
import '../stylesheets/friend-restaurant.css';

class Friend extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div>
                <NavBar />
                <div class="container">
                    <div class="row">
                        <div class="col-sm-9">
                            <Searchbar />
                        </div>
                        <div class="col-sm-3 p-3 rounded" style={{"backgroundColor": "#fed8b1"}}>
                            <FriendCard />     
                        </div>
                    </div>
                </div>
                

            </div>
        );
    }
}

export default Friend;
