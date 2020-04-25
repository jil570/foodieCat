import React, { Component } from 'react';
import { rgba } from 'polished';

export default class CategoryButton extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="uk-button uk-button-large uk-button-warning" id={this.props.id} onClick={this.props.onClick}>
            <span className="uk-text-lead uk-text-capitalize uk-text-left" style={{ color: rgba(0, 0, 0, 0.8) }}>
                {this.props.category}
            </span>
			</div>
		);
	}
}
