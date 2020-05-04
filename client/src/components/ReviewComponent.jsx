/* globals */
import React, { Component } from 'react';


class ReviewComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div>
                    <div className="uk-grid uk-margin-bottom">
                        <div className="uk-margin-right"><h5 className="uk-card-title">{this.props.restname}</h5></div>
                        <span uk-icon="star" className="uk-flex uk-flex-middle">Rating: {this.props.star}</span>
                    </div>
                </div>
                <hr />
            </div>
        );
    }
}

export default ReviewComponent;
