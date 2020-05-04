/* globals */
import React, { Component } from 'react';
import ReviewComponent from './ReviewComponent';


class RestComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            active:false,
            text:"Learn More"
        };

        this.toggleClass = this.toggleClass.bind(this);
    };
    
    toggleClass() {
        const currentState = this.state.active;
        if (currentState) {
            this.setState({ text: "Learn more" });
        }else{
            this.setState({ text: "Close"});
        }
        this.setState({ active: !currentState });

    };

    render() {
        return (
            <div>
            <div>
                <div className="uk-grid uk-margin-bottom">
                    <div className="uk-margin-right"><h5 className="uk-card-title">{this.props.restname}</h5></div>
                        <span uk-icon="star" className="uk-flex uk-flex-middle">Rating: {this.props.star}</span>
                        <span className="uk-flex uk-flex-middle uk-width-1">Location: {this.props.address}, {this.props.city}, {this.props.state}</span>
                        <span className="uk-flex uk-flex-middle uk-width-1">Distance From You: {this.props.dist} MILES</span>
                </div>
                {this.state.active ? (<p>{this.props.text}</p>) : null}
                <a className={"uk-button uk-button-default"} onClick={this.toggleClass}>{this.state.text}</a>
            </div>
                <hr />
            </div>
        );
    }
}

export default RestComponent;
