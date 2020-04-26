import React, { Component } from 'react';
import NavBar from './NavBar';
import Post from './Post';
import { getUser } from '../javascripts/userRequests';
import { getLikes } from '../javascripts/postRequests';

class Friend extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div>
                <NavBar />
            </div>
        );
    }
}

export default Friend;
