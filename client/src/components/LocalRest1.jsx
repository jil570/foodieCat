import React, { Component } from 'react';
import image from '../images/slide-5.jpg';
import { rgba } from 'polished';
import '../stylesheets/homepage-style.css';
import LocalComp1 from './LocalComp1';
import NavBar from './NavBar';

class LocalRest1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            city: this.props.location.state.city,
            category: this.props.location.state.category,
            reviews: []
        };
    }

    componentDidMount() {
        let reviewList = this.props.location.state.reviews;
        let reviewDivs = reviewList.map((reviewObj, i) =>
            <LocalComp1 key={i} restname={reviewObj.name} useful={reviewObj.useful} text={reviewObj.text} avg_stars={reviewObj.avg_stars} star={reviewObj.stars} />
        );
        this.setState({ reviews: reviewDivs});
    }

    render() {
        return (
            <div>
            <NavBar />
            <div>
                <div
                id="slideshow1"
                className="fixed uk-cover-container uk-background-secondary uk-flex uk-light uk-flex-center uk-flex-middle uk-height-viewport uk-background-cover"
                data-uk-height-viewport="true"
                style={{ backgroundImage: `url(${image})` }}
                >
                <div className="uk-border-rounded uk-width-3-4 uk-padding-large uk-position-z-index" uk-scrollspy="cls: uk-animation-fade" style={{ backgroundColor: rgba(0, 0, 0, 0.7) }}>
                    <a href="/local" className="uk-icon-link" uk-icon="arrow-left">Go Back to Search</a>
                    <h3 className="uk-text-center uk-text-uppercase"><span>Reviews for Top {this.state.category} Local Restaurants in {this.state.city}</span></h3>
                    <hr />
                    <ul className="uk-list uk-list-large">
                        {this.state.reviews}
                    </ul>
                </div>
                </div>
            </div>
            </div>
        );
    }
}

export default LocalRest1;
