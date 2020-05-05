import React, { Component } from 'react';

class LocalComp2 extends Component {
    constructor(props) {
        super(props);
    };
    
    render() {
        var str = "Hair Stylists;Hair Salons;Men's Hair Salons;Blow Dry/Out Services;Hair Extensions;Beauty & Spas";
        var parsed = str.split(';');
        var joined = parsed.join(', ');
        return (
            <div>
            <div>
                <div className="uk-grid uk-margin-bottom">
                    <div className="uk-margin-right"><h5 className="uk-card-title">{this.props.restname}</h5></div>
                        <span uk-icon="star" className="uk-flex uk-flex-middle">Rating:{this.props.five_star_pct}</span>
                        <span className="uk-margin"></span>
                        <span className="uk-flex uk-flex-middle uk-width-1">Food Category: {joined}</span>
                        <span className="uk-flex uk-flex-middle uk-width-1">Address: {this.props.address}</span>
                        <span className="uk-flex uk-flex-middle uk-width-1">Has {this.props.review_count} reviews</span>
                </div>
            </div>
                <hr />
            </div>
        );
    }
}

export default LocalComp2;
