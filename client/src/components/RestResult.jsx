/* globals */

import React, { Component } from 'react';
import { rgba } from 'polished';
import '../stylesheets/auth-pages-style.css';
import '../stylesheets/uikit.min.css';
import image from '../images/slide-5.jpg';
import NavBar from './NavBar';
import RestComponent from './RestComponent';

class RestResult extends Component {
    constructor(props) {
        super(props);

        this.state = {
            restaurants: []
        };


    };

    componentDidMount() {
        let restaurantList = this.props.location.state.results;
        // let restaurantKeys = new Set();
        // let mergedList = restaurantList.filter(item => {
        //     if (!restaurantKeys.has(item.business_id)){
        //         restaurantKeys.add(item.business_id);
        //         return true;
        //     }
        //     return false;
        // }, restaurantKeys);

        var output = [];

        restaurantList.forEach(function (item) {
            var existing = output.filter(function (v, i) {
                return v.business_id == item.business_id;
            });
            if (existing.length) {
                var existingIndex = output.indexOf(existing[0]);
                output[existingIndex].text = output[existingIndex].text.concat(item.text);
            } else {
                if (typeof item.text == 'string')
                    item.text = [item.text];
                output.push(item);
            }
        });

        console.log(output);

        let restaurantObj = restaurantList.map((rest, i) =>
            <RestComponent key={rest.business_id} restname={rest.name} text={rest.text} star={rest.avg_stars} address={rest.address} city={rest.city} state={rest.state} dist={rest.distance}/>);
        this.setState({ restaurants: restaurantObj});

        console.log(restaurantList);
    }


    render() {
        return (
            <div>
                <NavBar />
                <div
                    id="slideshow"
                    className="uk-cover-container uk-background-secondary uk-flex uk-flex uk-flex-center uk-flex-middle uk-light uk-height-viewport uk-background-cover"
                    data-uk-height-viewport="true"
                    style={{ backgroundImage: `url(${image})` }}
                >
                    
                    <div className="uk-border-rounded uk-width-3-4 uk-padding-large uk-position-z-index" uk-scrollspy="cls: uk-animation-fade" style={{ backgroundColor: rgba(0, 0, 0, 0.7) }}>
                        <a href="/findRestaurant" class="uk-icon-link" uk-icon="arrow-left">Go Back to Search</a>
                        <h2 className="uk-text-center uk-text-uppercase"><span>Top Restaurant Under Your Search</span></h2>
                        <hr />
                        <ul className="uk-list uk-list-large">
                            {this.state.restaurants}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default RestResult;