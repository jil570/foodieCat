import React, { Component } from 'react';
import image from '../images/slide-5.jpg';
import { rgba } from 'polished';
import '../stylesheets/homepage-style.css';
import LocalComp2 from './LocalComp2';
import NavBar from './NavBar';

class LocalRest2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            city: this.props.location.state.city,
            category: this.props.location.state.category,
            locals: []
        };
    }

    componentDidMount() {
        let localList = this.props.location.state.locals;
        let localDivs = localList.map((localObj, i) =>
            <LocalComp2 key={i} restname={localObj.name} address={localObj.address} avg_stars={localObj.avg_stars} categories={localObj.categories} review_count={localObj.review_count} />
        );
        this.setState({ locals: localDivs});
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
                <div className="uk-border-rounded uk-padding-large uk-position-z-index" uk-scrollspy="cls: uk-animation-fade" style={{ backgroundColor: rgba(0, 0, 0, 0.7) }}>
                    <a href="/local" className="uk-icon-link" uk-icon="arrow-left">Go Back to Search</a>
                    <h3 className="uk-text-center uk-text-uppercase"><span>Top Local Restaurants in {this.state.city}</span></h3>
                    <hr />
                    <ul className="uk-list uk-list-large">
                        {this.state.locals}
                    </ul>
                </div>
                </div>
            </div>
            </div>
        );
    }
}

export default LocalRest2;
