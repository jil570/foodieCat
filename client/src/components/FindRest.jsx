/* globals */

import React, { Component } from 'react';
import { rgba } from 'polished';
import '../stylesheets/auth-pages-style.css';
import image from '../images/slide-5.jpg';
import NavBar from './NavBar';
import RestComponent from './RestComponent';

class FindRestaurant extends Component {
    constructor(props) {
        super(props);

        this.state = {
            longitude:'',
            latitude:'',
            category1:'',
            category2:'',
            min_star: 0,
            restaurants: []
        };

        this.handleCategory1Change = this.handleCategory1Change.bind(this);
        this.handleCategory2Change = this.handleCategory2Change.bind(this);
        this.handleChangeStar = this.handleChangeStar.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    };

    handleChangeStar(event) {
        this.setState({ min_star: event.target.value });
        console.log(this.state);
    }

    handleCategory1Change(event) {
        this.setState({ category1: event.target.value });
   }

    handleCategory2Change(event) {
        this.setState({ category2: event.target.value });
        console.log(this.state);
    }

    handleSubmit(event) {
        console.log(this.state);
        event.preventDefault();

        const {
            category1,
            category2,
            min_star
        } = this.state;

        if (category1 === ""
            || category2 === ""
            || min_star === 0) {
            alert("Please fill in all the info.");
            return;
        }

        fetch("http://localhost:9000/restaurant/" + this.state.min_star + '/' + this.state.category1 + '/' + this.state.category2,
            {
                method: "GET"
            }).then(res => {
                return res.json();
            }, err => {
                console.log(err);
            }).then(restaurantList => {
                let restaurantObj = restaurantList.map((rest, i) =>
                    // console.log(rest.stars)
                    <RestComponent restname={rest.name} categories={rest.categories} star={rest.stars} />
                );
                //This saves our HTML representation of the data into the state, which we can call in our render function
                this.setState({
                    restaurants: restaurantObj
                });
            });

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
                    <div className="uk-border-rounded uk-width-3-4 uk-padding-large uk-position-z-index" uk-scrollspy="cls: uk-animation-fade" style={{ backgroundColor: rgba(0, 0, 0, 0.7)}}>
                        <h2 className="uk-text-center uk-text-uppercase"><span>Find a New Restaurant</span></h2>
                        <hr />
                        <form className="uk-form-stacked">
                            <fieldset className="uk-fieldset">

                                <label class="uk-form-label" for="form-stacked-select"><h5>Choose the type of food! (by location)</h5></label>
                                <div className="uk-margin uk-grid-small uk-child-width-auto uk-grid">
                                    <label className="uk-margin-right"><input className="uk-radio" type="radio" name="radio2" value="Japanese" onClick={this.handleCategory1Change}/> Japanese</label>
                                    <label className="uk-margin-right"><input className="uk-radio" type="radio" name="radio2" value="Chinese" onClick={this.handleCategory1Change}/> Chinese</label>
                                    <label className="uk-margin-right"><input className="uk-radio" type="radio" name="radio2" value="Mexican" onClick={this.handleCategory1Change}/> Mexican</label>
                                    <label className="uk-margin-right"><input className="uk-radio" type="radio" name="radio2" value="Italian" onClick={this.handleCategory1Change}/> Italian</label>
                                    {/* <label><input className="uk-radio" type="radio" name="radio2" /> B</label>
                                    <label><input className="uk-radio" type="radio" name="radio2" /> B</label> */}
                                </div>
                                <hr />

                                <label class="uk-form-label" for="form-stacked-select"><h5>Choose the type of meal! (by time)</h5></label>
                                <div className="uk-margin uk-grid-small uk-child-width-auto uk-grid">
                                    <label className="uk-width-2-5"><input className="uk-radio" type="radio" name="radio3" value="Breakfast" onClick={this.handleCategory2Change}/> Breakfast & Brunch</label>
                                    <label className="uk-width-2-5"><input className="uk-radio" type="radio" name="radio3" value="Lunch" onClick={this.handleCategory2Change}/> Lunch</label>
                                    <label className="uk-width-2-5"><input className="uk-radio" type="radio" name="radio3" value="Dinner" onClick={this.handleCategory2Change}/> Dinner</label>
                                    <label className="uk-width-2-5"><input className="uk-radio" type="radio" name="radio3" value="Fast Food" onClick={this.handleCategory2Change}/> Fast Food</label>
                                    <label className="uk-width-2-5"><input className="uk-radio" type="radio" name="radio3" value="Diner" onClick={this.handleCategory2Change}/> Diner</label>
                                    <label className="uk-width-3-5"><input className="uk-radio" type="radio" name="radio3" value="Ice Cream & Frozen Yogurt" onClick={this.handleCategory2Change}/> Ice Cream & Frozen Yogurt</label>
                                </div>
                                <hr />

                                <label className="uk-form-label" for="form-stacked-select"><h5>Show restaurants with </h5></label>
                                <div className="uk-margin">
                                    <select class="uk-select uk-width-1-4" onChange={this.handleChangeStar}>
                                        <option select value> -- select a number --</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </select> <label className="uk-form-label uk-margin"><h5>stars or more</h5></label>
                                </div>
                            </fieldset>
                        </form>
                        <hr/>
                        <div className="uk-flex uk-flex-center"><button class="uk-button uk-button-danger" onClick={this.handleSubmit} href="/findRestaurant/result">Search</button></div>
 
               
            </div>
                </div>
                <div
                    id="slideshow"
                    className="uk-cover-container uk-background-secondary uk-flex uk-flex uk-flex-center uk-flex-middle uk-light uk-height-viewport uk-background-cover"
                    data-uk-height-viewport="true"
                    style={{ backgroundImage: `url(${image})` }}>
                <div className="uk-border-rounded uk-width-3-4 uk-padding-large uk-position-z-index" uk-scrollspy="cls: uk-animation-fade" style={{ backgroundColor: rgba(0, 0, 0, 0.7) }}>
                    <h2 className="uk-text-center uk-text-uppercase"><span>Top Restaurant Under Your Search</span></h2>
                    <hr />
                    <ul className="uk-list uk-list-large">
                        {/* <RestComponent restname="test" categories="xxxxxxx" star="5" /> */}
                        {this.state.restaurants}
                    </ul>
                </div>
                </div>
            </div>
        );
    }
}

export default FindRestaurant;
