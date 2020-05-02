import React, { Component } from 'react';
import { rgba } from 'polished';
import '../stylesheets/homepage-style.css';

export default class CategoryButton extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="uk-button uk-button-medium button-primary" id={this.props.id} onClick={this.props.onClick}>
            <span className="uk-text-lead uk-text-capitalize uk-text-left" style={{ color: rgba(255, 255, 255, 1) }}>
                {this.props.category}
            </span>
			</div>
		);
	}
}
