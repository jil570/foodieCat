import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import image4 from '../images/slide-4.jpg';
import { rgba } from 'polished';
import logo from '../images/logo.png';
import '../stylesheets/homepage-style.css';
import NavBar from './NavBar';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      category: '',
      cities: ['Las Vegas', 'Phoenix', 'Pittsburgh', 'Madison', 'Champaign', 'Charlotte'],
      categories: ['Japanese', 'Chinese', 'Mexican', 'Italian', 'Ice Cream & Frozen Yogurt', 'Fast Food'],
      restaurants: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCityChange = this.handleCityChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
  }

  handleCityChange(event) {
    this.setState({ city: event });
  }

  handleCategoryChange(event) {
    this.setState({ category: event });
  }

  handleSubmit(event) {
    event.preventDefault();

    const {
        city,
        category
      } = this.state;

    if (city == '' || category == ''){
      alert("Please select a city and a food category.");
      return;
    }

    fetch('http://localhost:9000/home/' + city + '/' + category,
        {
          method: 'GET'
        }).then(res => {
          return res.json();
    }, err => {
      console.log(err);
    }).then( restaurantList => {
      if (!restaurantList) return;
      this.setState({
          restaurants: restaurantList
      });
    }, err => {
      console.log(err);
    });
  }
  
  render() {
    const { cities, categories} = this.state;
    const cityButtons = [];
    const categoryButtons = [];

    cities.forEach((city) => {
      cityButtons.push(
        <label style={{ color: rgba(255, 255, 255, 0.8) }}>
          <input onChange={this.handleCityChange.bind(this, city)} className="uk-radio" type="radio" name="city"/>
          {city}
        </label>
      );
    });
    
    categories.forEach((category) => {
      categoryButtons.push(
        <label style={{ color: rgba(255, 255, 255, 0.8) }}>
          <input onChange={this.handleCategoryChange.bind(this, category)} className="uk-radio" type="radio" name="category"/>
          {category}
        </label>
      );
    });

    return (
      <div>
        <NavBar />
        <div className="uk-flex-column">
          <div
            id="slideshow1"
            className="uk-cover-container uk-background-blend-screen uk-background-secondary uk-flex uk-light uk-flex-center uk-flex-middle uk-height-viewport uk-background-cover"
            data-uk-height-viewport="true"
            style={{ backgroundImage: `url(${image4})` }}
          >
            <div className="uk-border-rounded uk-flex-center uk-flex-middle uk-padding-large" style={{ backgroundColor: rgba(0, 0, 0, 0.6) }}>
              <p className="uk-flex uk-flex-middle">
              <div className="uk-inline uk-flex-first uk-align-center uk-heading-large uk-text-center" style={{ color: rgba(255, 213, 79, 1) }}>
                <div className="serif">foodieCat</div>
              </div>
              <div className="uk-inline responsive uk-width-1-4@m uk-height-1-5@m uk-flex-last">
                  <img src={logo} alt="Logo" width="200" height="200"/>
              </div>
              </p>
              <hr className="uk-divider-icon"></hr>
              <br></br>
              <div className="uk-text-large uk-text-center serif" style={{ color: rgba(247, 220, 111, 0.8) }}>
                Explore the Best Restaurants with Fellow Foodies
              </div>
              <br></br><br></br>
              <div className="uk-cover-container uk-flex uk-flex-center uk-flex-middle">
                <form onSubmit={this.handleSubmit}>
                  <fieldset className="uk-fieldset">   
                  <div className="cities">
                    <h4 className="uk-text-large uk-text-left" style={{ color: rgba(255, 213, 79, 1) }}>
                      Cities
                    </h4>
                    <div className="uk-margin uk-text-lead uk-grid-small uk-child-width-auto uk-grid">
                      {cityButtons}
                    </div>
                  </div>
                  <br></br><br></br>
                  <div className="categories">
                    <h4 className="uk-text-large uk-text-left" style={{ color: rgba(255, 213, 79, 1) }}>
                      Food Categories
                    </h4>
                    <div className="uk-margin uk-text-lead uk-grid-small uk-child-width-auto uk-grid">
                      {categoryButtons}
                    </div>
                  </div>
                  <br></br><br></br>
                  <div>
                    <input type="submit" className="uk-button-danger uk-button-large uk-text-large" value="Get Top Restaurants ->" />
                  </div>
                  {this.state.restaurants.length > 0 &&
                    <Redirect to={{
                        pathname: '/homepage/result',
                        state: {
                          results: this.state.restaurants,
                          city: this.state.city,
                          category: this.state.category
                         }
                    }} />}
                  </fieldset>
                </form>
              </div>
            </div>
          </div>           
        </div>
      </div>
    );
  }
}

export default HomePage;