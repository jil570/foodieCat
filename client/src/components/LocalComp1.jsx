import React, { Component } from 'react';

class LocalComp1 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            active:false,
            text:"View Review"
        };

        this.toggleClass = this.toggleClass.bind(this);
    };
    
    toggleClass() {
        const currentState = this.state.active;
        if (currentState) {
            this.setState({ text: "View Review" });
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
                        <span uk-icon="star" className="uk-flex uk-flex-middle">Reviewer Rating: {this.props.star}</span>
                        <span className="uk-flex uk-flex-middle uk-width-1">{this.props.useful} users found this review useful</span>
                        <span uk-icon="star" className="uk-flex uk-flex-middle uk-width-1">Average rating for this restaurant: {this.props.avg_stars}</span>
                </div>
                {this.state.active ? (<p>{this.props.text}</p>) : null}
                <a className={"uk-button uk-button-default"} onClick={this.toggleClass}>{this.state.text}</a>
            </div>
                <hr />
            </div>
        );
    }
}

export default LocalComp1;