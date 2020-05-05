/* globals */
import React, { Component } from 'react';
import ReviewComponent from './ReviewComponent';


class RestComponent extends Component {
    constructor(props) {
        super(props);
        
        // console.log(this.props.review_useful);
        this.state = {
            active:false,
            name:"",
            stars:"",
            address:"",
            distance:"",
        };
    };

    componentDidMount(){
        
    }

    render() {
        return (
            <div>
            <div>
                <div className="uk-grid uk-margin-bottom">
                    <div className="uk-margin-right"><h5 className="uk-card-title">{this.props.restname}</h5></div>
                        <span uk-icon="star" className="uk-flex uk-flex-middle">Rating: {this.props.star}</span>
                        <span uk-icon="location" className="uk-flex uk-flex-middle uk-width-1">Location: {this.props.address}, {this.props.city}, {this.props.state}</span>
                        <span className="uk-flex uk-flex-middle uk-width-1">{this.props.distance} km away from you</span>
                </div>
                {this.state.active ? (
                        <table className="uk-table uk-table-divider">
                            <tbody>
                                {this.state.reviews}
                            </tbody>
                            </table>
                        ) : null}
            </div>
                <hr />
            </div>
        );
    }
}

export default RestComponent;
