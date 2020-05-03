/* globals */

import React, { Component } from 'react';
import { rgba } from 'polished';
import '../stylesheets/auth-pages-style.css';
import image from '../images/slide-5.jpg';
import NavBar from './NavBar';
import RestComponent from './RestComponent';

class RecRestaurant extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>
                <NavBar />
                <div
                    id="slideshow"
                    className="uk-cover-container uk-background-secondary uk-flex uk-light uk-flex-center uk-flex-middle uk-height-viewport uk-background-cover"
                    data-uk-height-viewport="true"
                    style={{ backgroundImage: `url(${image})` }}>
                    <div className="uk-border-rounded uk-padding-large uk-width-3-4 uk-position-z-index" uk-scrollspy="cls: uk-animation-fade" style={{ backgroundColor: rgba(0, 0, 0, 0.7)}}>
                        <h2 class="uk-text-center uk-text-uppercase"><span>Recommended Restaurant</span></h2>
                            <hr/>
                            <ul class="uk-list uk-list-large uk-text-center">
                                <RestComponent text="xxxxxxx" />
                            </ul>
                        </div>
                </div>
            </div>
        );
    }
}

export default RecRestaurant;
