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

        this.state = {min_star: "0"};

    };

    handleChange(event){
        this.setState({min_star: event.target.value});
        console.log(this.state);
    }

    render() {
        return (
            <div>
                <NavBar />
            <div
                id="slideshow"
                className="uk-cover-container uk-background-secondary uk-flex uk-light uk-flex-center uk-flex-middle uk-height-viewport uk-background-cover"
                data-uk-height-viewport="true"
                style={{ backgroundImage: `url(${image})` }}
            >
                    <div className="uk-border-rounded uk-width-3-4 uk-padding-large uk-position-z-index" uk-scrollspy="cls: uk-animation-fade" style={{ backgroundColor: rgba(0, 0, 0, 0.7)}}>
                        <h2 className="uk-text-center uk-text-uppercase"><span>Find a New Restaurant</span></h2>
                        <hr />
                        <form className="uk-form-stacked">
                            <fieldset className="uk-fieldset">

                                <label class="uk-form-label uk-margin" for="form-stacked-select"><h5>Choose the type of food! (by location)</h5></label>
                                <div className="uk-margin uk-grid-small uk-child-width-auto uk-grid">
                                    <label className="uk-margin-right"><input className="uk-radio" type="radio" name="radio2" /> Japanese</label>
                                    <label className="uk-margin-right"><input className="uk-radio" type="radio" name="radio2" /> Chinese</label>
                                    <label className="uk-margin-right"><input className="uk-radio" type="radio" name="radio2" /> Mexican</label>
                                    <label className="uk-margin-right"><input className="uk-radio" type="radio" name="radio2" /> Italian</label>
                                    {/* <label><input className="uk-radio" type="radio" name="radio2" /> B</label>
                                    <label><input className="uk-radio" type="radio" name="radio2" /> B</label> */}
                                </div>
                                <hr />

                                <label class="uk-form-label uk-margin" for="form-stacked-select"><h5>Choose the type of meal! (by time)</h5></label>
                                <div className="uk-margin uk-grid-small uk-child-width-auto uk-grid">
                                    <label className="uk-width-2-5"><input className="uk-radio" type="radio" name="radio3" /> Breakfast & Brunch</label>
                                    <label className="uk-width-2-5"><input className="uk-radio" type="radio" name="radio3" /> Lunch</label>
                                    <label className="uk-width-2-5"><input className="uk-radio" type="radio" name="radio3" /> Dinner</label>
                                    <label className="uk-width-2-5"><input className="uk-radio" type="radio" name="radio3" /> Fast Food</label>
                                    <label className="uk-width-2-5"><input className="uk-radio" type="radio" name="radio3" /> Diner</label>
                                    <label className="uk-width-3-5"><input className="uk-radio" type="radio" name="radio3" /> Ice Cream & Frozen Yogurt</label>
                                </div>
                                <hr />

                                <label className="uk-form-label uk-margin" for="form-stacked-select"><h5>Show restaurants with </h5></label>
                                <div className="uk-margin">
                                    <select class="uk-select uk-width-1-4">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </select> <label className="uk-form-label uk-margin"><h5>stars or more</h5></label>
                                </div>
                            </fieldset>
                        </form>
                        <hr/>
                        <div className="uk-flex uk-flex-center"><button class="uk-button uk-button-danger">Search</button></div>
                                           
                        {/* <ul className="uk-list uk-list-large">
                            <RestComponent text="xxxxxxx"/>
                        </ul> */}
                </div>
            </div>
            </div>
        );
    }
}

export default FindRestaurant;
