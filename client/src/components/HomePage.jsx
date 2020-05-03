import React, { Component } from 'react';
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
      restaurants: [],
      result_header:
        <div className="uk-text-lead uk-text-center serif" style={{ color: rgba(52, 73, 94 , 1) }}>
        Top Restaurants in USA
        </div>
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

      let restaurantDivs = restaurantList.map((restaurantObj, i) =>
        <tr>
          <td>{restaurantObj.name}</td>
          <td>{restaurantObj.stars}</td>
          <td>{restaurantObj.review_count}</td>
        </tr>
      );
      this.setState({
        restaurants: restaurantDivs,
        result_header:
          <div className="uk-text-lead uk-text-center serif" style={{ color: rgba(52, 73, 94 , 1) }}>
          Top {this.state.category} Restaurants in {this.state.city}
          </div>
      });
    }, err => {
      console.log(err);
    });
  }

  componentDidMount() {
    fetch('http://localhost:9000/home/usa',
        {
          method: 'GET'
        }).then(res => {
          return res.json();
    }, err => {
      console.log(err);
    }).then( restaurantList => {
      if (!restaurantList) return;

      let restaurantDivs = restaurantList.map((restaurantObj, i) =>
        <tr>
          <td>{restaurantObj.name}</td>
          <td>{restaurantObj.stars}</td>
          <td>{restaurantObj.review_count}</td>
        </tr>
      );
      this.setState({
        restaurants: restaurantDivs
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
              <div className="uk-inline uk-flex-first uk-align-center uk-heading-large uk-text-center serif" style={{ color: rgba(255, 213, 79, 1) }}>
                foodieCat
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
                    <input type="submit" className="button-primary uk-button-large uk-text-large" value="Get Top Restaurants ->" />
                  </div>
                  </fieldset>
                </form>
              </div>
            </div>
          </div>           
          <div           
          id="slideshow2"
          className="uk-flex uk-flex-column uk-padding-large" style={{ backgroundColor: rgba(252, 243, 207, 0.5) }}
          >
            <p className="center uk-flex uk-wrap uk-flex-top">
              {this.state.result_header}
            </p>
            <div className="center uk-flex uk-flex-middle uk-flex-center">
              <table style={{ color: rgba(52, 73, 94, 0.9) }} className="uk-table uk-table-hover uk-table-divider uk-flex-middle uk-flex-right uk-table-middle uk-table-large">
                <thead>
                    <tr>
                        <th style={{ color: rgba(46, 64, 83, 0.6) }}>Restaurant</th>
                        <th style={{ color: rgba(46, 64, 83, 0.6) }}>Star Rating</th>
                        <th style={{ color: rgba(46, 64, 83, 0.6) }}>Yelp Review Count</th>
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

export default HomePage;