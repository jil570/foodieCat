import React, { Component } from 'react';
import image4 from '../images/slide-4.jpg';
import { rgba } from 'polished';
import '../stylesheets/homepage-style.css';
import NavBar from './NavBar';

class HomeRest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            restaurants: this.props.location.state.restaurants,
            result_header: this.props.location.state.result_header
        };
    };

    render() {
        return (
            <div>
                <NavBar />
                <div
                    id="slideshow1"
                    className="uk-cover-container uk-background-blend-screen uk-background-secondary uk-flex uk-light uk-flex-center uk-flex-middle uk-height-viewport uk-background-cover"
                    data-uk-height-viewport="true"
                    style={{ backgroundImage: `url(${image4})` }}
                >
                    <div className="uk-border-rounded uk-flex-center uk-flex-middle uk-padding-large" style={{ backgroundColor: rgba(0, 0, 0, 0.7) }}>
                        <p className="center uk-flex uk-wrap uk-flex-top">
                            {this.state.result_header}
                        </p>
                        <div className="center uk-flex uk-flex-middle uk-flex-center">
                            <table style={{ color: rgba(0, 0, 0, 1) }} className="uk-table uk-table-hover uk-table-divider uk-flex-middle uk-flex-right uk-table-middle uk-table-large">
                                <thead>
                                    <tr>
                                        <th style={{ color: rgba(0, 0, 0, 1) }}>Restaurant</th>
                                        <th style={{ color: rgba(0, 0, 0, 1) }}>Star Rating</th>
                                        <th style={{ color: rgba(0, 0, 0, 1) }}>Yelp Review Count</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {this.state.restaurants}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default HomeRest;
