import React, { Component } from 'react';
import { rgba } from 'polished';
import '../stylesheets/homepage-style.css';

export default class CityButton extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<button className="uk-button uk-button-medium button-primary" id={this.props.id} onClick={this.props.onClick}>
            <span className="uk-text-capitalize uk-text-lead uk-text-left" style={{ color: rgba(255, 255, 255, 1) }}>
                {this.props.city}
            </span>
			</button>
		);
	}
}
