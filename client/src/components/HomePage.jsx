import React, { Component } from 'react';
import image4 from '../images/slide-4.jpg';
import CityButton from './CityButton';
import CategoryButton from './CategoryButton';
import { rgba } from 'polished';
import logo from '../images/logo.png';
import '../stylesheets/homepage-style.css';
import NavBar from './NavBar';

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
      <div>
        <NavBar />
        <div className="uk-flex-column">
          <div
            id="slideshow1"
            className="uk-cover-container uk-background-blend-screen uk-background-secondary uk-flex uk-light uk-flex-center uk-flex-middle uk-height-viewport uk-background-cover"
            data-uk-height-viewport="true"
            style={{ backgroundImage: `url(${image4})` }}
          >
            <div className="uk-border-rounded uk-flex-center uk-flex-middle uk-padding-large" style={{ backgroundColor: rgba(0, 0, 0, 0.4) }}>
              <p className="uk-flex uk-flex-middle">
              <div className="uk-inline uk-flex-first uk-align-center uk-heading-large uk-text-center serif" style={{ color: rgba(255, 213, 79, 1) }}>
                foodieCat
              </div>
              <div className="uk-inline responsive uk-width-1-4@m uk-height-1-5@m uk-flex-last">
                  <img src={logo} alt="Logo" width="200" height="200"/>
              </div>
              </p>
              <hr className="uk-divider-icon"></hr>
              <div className="uk-text-lead uk-text-center" style={{ color: rgba(255, 213, 79, 1) }}>
                Explore the Best Restaurants in US!
              </div>
              <br></br>
              <div className="container restaurants-container">
                <div className="cities">
                  <h4 className="uk-text-large uk-text-left" style={{ color: rgba(255, 213, 79, 1) }}>
                    Cities
                  </h4>
                  <div className="uk-text-left">
                    {cityButtons}
                  </div>
                </div>
                <br></br><br></br>
                <div className="categories">
                  <h4 className="uk-text-large uk-text-left" style={{ color: rgba(255, 213, 79, 1) }}>
                    Food Categories
                  </h4>
                  <div className="uk-text-left">
                    {categoryButtons}
                  </div>
                </div>
              </div>
            </div>
          </div>           
          <div           
          id="slideshow2"
          className="uk-flex uk-flex-column uk-padding-large" style={{ backgroundColor: rgba(93, 173, 226, 0.55) }}
          >
            <p className="center uk-flex uk-wrap uk-flex-top">
              <div className="uk-text-lead uk-text-center" style={{ color: rgba(0, 0, 0, 1) }}>
                Here are the top 10 restaurants we found for you
              </div>
            </p>
            <div className="center uk-flex uk-flex-middle uk-flex-center">
              <table className="uk-table uk-table-hover uk-table-divider uk-flex-middle uk-flex-right uk-table-middle uk-table-large">
                <thead>
                    <tr>
                        <th>Restaurant</th>
                        <th>Star Rating</th>
                        <th>Yelp Review Count</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Table Data</td>
                        <td>Table Data</td>
                        <td>Table Data</td>
                    </tr>
                    <tr>
                        <td>Table Data</td>
                        <td>Table Data</td>
                        <td>Table Data</td>
                    </tr>
                    <tr>
                        <td>Table Data</td>
                        <td>Table Data</td>
                        <td>Table Data</td>
                    </tr>
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