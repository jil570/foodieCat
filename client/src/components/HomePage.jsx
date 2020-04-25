import React, { Component } from 'react';
import image from '../images/slide-4.jpg';
import CityButton from './CityButton';
import CategoryButton from './CategoryButton';
import { rgba } from 'polished';
import logo from '../images/logo.png';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: ['Las Vegas', 'New York', 'San Francisco', 'Chicago'],
      categories: ['Japanese', 'Chinese', 'Mexican', 'Italian', 'Ice Cream & Frozen Yogurt', 'Fast Food']
    }
  }

  render() {
    const { cities, categories } = this.state;
    const cityButtons = [];
    const categoryButtons = [];

    cities.forEach((city) => {
      cityButtons.push(<CityButton id={"button-" + city} onClick={() => this.setCities(city)} city={city} />);
    });
    
    categories.forEach((category) => {
      categoryButtons.push(<CategoryButton id={"button-" + category} onClick={() => this.showRestaurants(category)} category={category} />);
    });

    return (
      <div
        id="slideshow"
        className="uk-cover-container uk-background-secondary uk-flex uk-light uk-flex-center uk-flex-middle uk-height-viewport uk-background-cover"
        data-uk-height-viewport="true"
        style={{ backgroundImage: `url(${image})` }}
      >
        
        <div className="uk-border-rounded uk-flex-center uk-padding-large" style={{ backgroundColor: rgba(0, 0, 0, 0.4) }}>
          <p>
          <div class="uk-inline uk-align-center uk-heading-large uk-flex-center uk-flex-middle uk-text-center">
            foodieCat &emsp;
          </div>
          <div class="uk-inline">
              <img src={logo} alt="Logo" />
          </div>
          </p>
          <hr class="uk-divider-icon"></hr>
          <div className="container restaurants-container">
            <div className="cities">
              <h4 className="uk-text-large uk-text-left uk-text-bolder" style={{ color: rgba(255, 255, 255, 1) }}>
                Cities
              </h4>
              <div className="uk-text-left">
                {cityButtons}
              </div>
            </div>
            <br></br><br></br><br></br>
            <div className="categories">
              <h4 className="uk-text-large uk-text-left uk-text-bolder" style={{ color: rgba(255, 255, 255, 1) }}>
                Food Categories
              </h4>
              <div className="uk-text-left">
                {categoryButtons}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;