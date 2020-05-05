import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import image from '../images/slide-2.jpg';
import { rgba } from 'polished';
import '../stylesheets/homepage-style.css';
import NavBar from './NavBar';

class Local extends Component {
    constructor(props) {
        super(props);
        this.state = {
            city: '',
            category: '',
            cities: ['Las Vegas', 'Phoenix', 'Pittsburgh', 'Madison', 'Champaign', 'Charlotte'],
            categories: ['Japanese', 'Chinese', 'Mexican', 'Italian', 'Ice Cream & Frozen Yogurt', 'Fast Food'],
            reviews: [],
            locals: [],
            redirect: 0
        };
    
        this.handleCityChange = this.handleCityChange.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.handleSubmit1 = this.handleSubmit1.bind(this);
        this.handleSubmit2 = this.handleSubmit2.bind(this);
        this.renderRedirect = this.renderRedirect.bind(this);
    }

    handleCityChange(event) {
        this.setState({ city: event });
    }

    handleCategoryChange(event) {
        this.setState({ category: event });
    }

    handleSubmit1(event) {
        event.preventDefault();
        
        const {category, city} = this.state;
    
        if (city == '' || category == ''){
          alert("Please select a city and a food category.");
          return;
        }

        this.setState({ redirect: 1 })

        fetch('http://localhost:9000/local/' + city + '/' + category,
            {
            method: 'GET'
            }).then(res => {
            return res.json();
        }, err => {
            console.log(err);
        }).then( reviewList => {
            if (!reviewList) return;
            this.setState({
                reviews: reviewList
            });
        }, err => {
            console.log(err);
        });
    }

    handleSubmit2(event) {
        event.preventDefault();
        
        const city = this.state.city;
    
        if (city == ''){
          alert("Please select a city.");
          return;
        }

        this.setState({ redirect: 2 })

        fetch('http://localhost:9000/local/' + city,
            {
            method: 'GET'
            }).then(res => {
            return res.json();
        }, err => {
            console.log(err);
        }).then( localList => {
            if (!localList) return;
            this.setState({
                locals: localList
            });
        }, err => {
            console.log(err);
        });
    }

    renderRedirect() {
        if (this.state.redirect == 1 && this.state.reviews.length > 0) {
            return (<Redirect to={{
                pathname: '/local/reviewresult',
                state: {
                    reviews: this.state.reviews,
                    city: this.state.city,
                    category: this.state.category
                }
            }} />);
        } else if (this.state.redirect == 2 && this.state.locals.length > 0) {
            return (<Redirect to={{
                pathname: '/local/topresult',
                state: {
                    locals: this.state.locals,
                    city: this.state.city
                }
            }} />);
        }
    }

    render () {
        const { cities, categories} = this.state;
        const cityButtons = [];
        const categoryButtons = [];

        cities.forEach((city) => {
            cityButtons.push(
                <label>
                <input onChange={this.handleCityChange.bind(this, city)} className="uk-radio" type="radio" name="city"/>
                {city}
                </label>
            );
        });
        
        categories.forEach((category) => {
        categoryButtons.push(
            <label>
            <input onChange={this.handleCategoryChange.bind(this, category)} className="uk-radio" type="radio" name="category"/>
            {category}
            </label>
        );
        });

        return (
            <div>
            <NavBar />
            <div>
                <div
                id="slideshow1"
                className="uk-cover-container uk-background-blend-screen uk-background-secondary uk-flex uk-light uk-flex-center uk-flex-middle uk-height-viewport uk-background-cover"
                data-uk-height-viewport="true"
                style={{ backgroundImage: `url(${image})` }}
                >
                <div className="uk-border-rounded uk-width-3-4 uk-padding-large uk-position-z-index" uk-scrollspy="cls: uk-animation-fade" style={{ backgroundColor: rgba(0, 0, 0, 0.7) }}>
                    <h2 className="uk-text-lead uk-text-center"><span>Explore the Local Restaurants</span></h2>
                    <form className="uk-form-stacked">
                        <fieldset className="uk-fieldset">
                            <label className="uk-form-label" htmlFor="form-stacked-select"><h5>Choose a city to explore!</h5></label>
                            <div className="uk-margin uk-grid-small uk-child-width-auto uk-grid">
                                {cityButtons}
                            </div>
                            <hr />

                            <label className="uk-form-label" htmlFor="form-stacked-select"><h5>Choose a food category to explore!</h5></label>
                            <div className="uk-margin uk-grid-small uk-child-width-auto uk-grid">
                                {categoryButtons}
                            </div>
                            <hr />
                        </fieldset>
                    </form>

                    <div className="uk-flex uk-flex-center">
                        <button className="uk-button uk-button-danger uk-margin-right" onClick={this.handleSubmit1}>
                            View the Reviews
                        </button>
                        <button className="uk-button button-primary uk-margin-left" onClick={this.handleSubmit2}>
                            Find the Best Local Food
                        </button>
                    </div>
                    {this.renderRedirect()}
                </div>
                </div>           
            </div>
            </div>
        );
    }
}

export default Local;