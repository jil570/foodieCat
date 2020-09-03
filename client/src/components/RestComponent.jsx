/* globals */
import React, { Component } from 'react';
import ReviewComponent from './ReviewComponent';


class RestComponent extends Component {
    constructor(props) {
        super(props);
        
        // console.log(this.props.review_useful);
        this.state = {
            active:false,
            text:"See Comment",
            texts:this.props.texts,
            review_dates: this.props.review_dates,
            useful: this.props.review_useful,
            reviews:[],
        };

        this.toggleClass = this.toggleClass.bind(this);
    };

    componentDidMount(){
        // console.log(this.state);
        let textList = this.state.texts;
        let dates = this.state.review_dates;
        let usefuls = this.state.useful;
        let reviews_dates = textList.map((text, i) => [text, new Date(dates[i]), usefuls[i]]);
        let reviewObj = reviews_dates.map((obj, i) =>
            <ReviewComponent key={this.props.business_id + i} text={obj[0]} date={obj[1].toISOString().slice(0, 10)} useful={obj[2]}/>);
        // let reviewObj = textList.map((text, i) =>
        //     <ReviewComponent key={this.props.business_id+i} text={text}/>);
        this.setState({ reviews: reviewObj});
    }
    
    toggleClass() {
        const currentState = this.state.active;
        if (currentState) {
            this.setState({ text: "See Comment" });
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
                        <span uk-icon="location" className="uk-flex uk-flex-middle uk-width-1">Location: {this.props.address}, {this.props.city}, {this.props.state}</span>
                        <span className="uk-flex uk-flex-middle uk-width-1">{this.props.dist} KM away from you</span>
                </div>
                {this.state.active ? (
                        // <ul className="uk-comment-list uk-margin">
                        <table className="uk-table uk-table-divider">
                            <tbody>
                                {this.state.reviews}
                            </tbody>
                            </table>

                        // <ul className="uk-list"> {this.state.reviews}
                        // {/* </div> */}
                        // </ul>
                        ) : null}
                <a className={"uk-button uk-button-default"} onClick={this.toggleClass}>{this.state.text}</a>
            </div>
                <hr />
            </div>
        );
    }
}

export default RestComponent;
