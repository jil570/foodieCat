import React, { Component } from 'react';
import image4 from '../images/slide-4.jpg';
import { rgba } from 'polished';
import '../stylesheets/homepage-style.css';
import NavBar from './NavBar';

class HomeRest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            city: this.props.location.state.city,
            category: this.props.location.state.category,
            restaurants: []
        };
    }

    componentDidMount() {
        let restaurantList = this.props.location.state.results;
        let restaurantDivs = restaurantList.map((restaurantObj, i) =>
            <tr>
            <td>{restaurantObj.name}</td>
            <td>{restaurantObj.stars}</td>
            <td>{restaurantObj.review_count}</td>
            </tr>
        );
        this.setState({ restaurants: restaurantDivs});
    }

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
                        <a href="/homepage" class="uk-icon-link" uk-icon="arrow-left">Go Back to Search</a>
                        <h3 className="uk-text-lead uk-text-center">
                            <span>Top {this.state.category} Restaurants in {this.state.city}</span>
                        </h3>
                        <div className="center uk-flex uk-flex-middle uk-flex-center">
                            <table style={{ color: rgba(255, 255, 255, 1) }} className="uk-table uk-table-hover uk-table-divider uk-flex-middle uk-flex-right uk-table-middle uk-table-large">
                                <thead>
                                    <tr>
                                        <th style={{ color: rgba(255, 255, 255, 1) }}>Restaurant</th>
                                        <th style={{ color: rgba(255, 255, 255, 1) }}>Star Rating</th>
                                        <th style={{ color: rgba(255, 255, 255, 1) }}>Yelp Review Count</th>
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
