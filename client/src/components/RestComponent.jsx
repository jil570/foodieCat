/* globals */
import React, { Component } from 'react';
import { rgba } from 'polished';
import '../stylesheets/auth-pages-style.css';
import image from '../images/slide-5.jpg';

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
                <li >List item 1</li>
                <p>Description</p>
                {this.state.active ? (<p>{this.props.text}</p>) : null}
                <a className={"uk-button uk-button-default"} onClick={this.toggleClass}>{this.state.text}</a>
                <hr/>
            </div>
        );
    }
}

export default RestComponent;
