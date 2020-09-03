/* globals */

import React, { Component } from 'react';
import { rgba } from 'polished';
import '../stylesheets/auth-pages-style.css';
import '../stylesheets/uikit.min.css';
import image from '../images/slide-3.jpg';
import NavBar from './NavBar';
import RestComponent from './RestComponent';
import ReviewComponent from './ReviewComponent';

class RestResult extends Component {
    constructor(props) {
        super(props);

        this.state = {
            restaurants: [],
            category1: "",
            category2: "",
            min_star: 0
        };
        
        this.goBack = this.goBack.bind(this);

    };

    goBack() {
        this.props.history.goBack();
    }

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
                return v.business_id === item.business_id;
            });
            if (existing.length) {
                var existingIndex = output.indexOf(existing[0]);
                output[existingIndex].text = output[existingIndex].text.concat(item.text);
                output[existingIndex].useful = output[existingIndex].useful.concat(item.useful);
                output[existingIndex].review_date = output[existingIndex].review_date.concat(item.review_date);
            } else {
                if (typeof item.text == 'string')
                    item.text = [item.text];
                if (typeof item.review_date == 'string')
                    item.review_date = [item.review_date];
                if (typeof item.useful == 'number')
                    item.useful = [item.useful];
                output.push(item);
            }
        });

        // console.log(output);

        let restaurantObj = output.map((rest, i) =>
            <RestComponent key={rest.business_id} restname={rest.name} texts={rest.text} star={rest.avg_stars} address={rest.address} city={rest.city} state={rest.state} dist={rest.distance} review_dates={rest.review_date} review_useful={rest.useful}/>);
        this.setState({ restaurants: restaurantObj, category1: this.props.location.state.category1, category2: this.props.location.state.category2, min_star: this.props.location.state.min_star});

        // console.log(this.state);
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
                        <a href="/findRestaurant" className="uk-icon-link" uk-icon="arrow-left">Go Back to Search</a>
                        <h2 className="uk-text-center uk-text-uppercase">Top Restaurant Under Your Search</h2>
                        <h3 className="uk-text-center">{this.state.category2} with {this.state.category1} style above {this.state.min_star} stars</h3>
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