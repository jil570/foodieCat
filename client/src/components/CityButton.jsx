import React, { Component } from 'react';
import { rgba } from 'polished';

export default class CityButton extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<button className="uk-button uk-button-large uk-button-primary" id={this.props.id} onClick={this.props.onClick}>
            <span className="uk-text-capitalize uk-text-lead uk-text-left" style={{ color: rgba(0, 0, 0, 0.8) }}>
                {this.props.city}
            </span>
			</button>
		);
	}
}
