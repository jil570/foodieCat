import React, { Component } from 'react';

class LocalComp2 extends Component {
    constructor(props) {
        super(props);
    };
    
    render() {
        return (
            <div>
            <div>
                <div className="uk-grid uk-margin-bottom">
                    <div className="uk-margin-right"><h5 className="uk-card-title">{this.props.restname}</h5></div>
                        <span uk-icon="star" className="uk-flex uk-flex-middle">Rating:{this.props.avg_stars}</span>
                        <span className="uk-margin"></span>
                        <span className="uk-flex uk-flex-middle uk-width-1">Food Category: {this.props.categories.split(';').join(', ')}.</span>
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
