import React, { Component } from 'react';
import '../stylesheets/uikit.min.css';

export default class Searchbar extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        const searchStyle = {
            "display": "block",
            "border": "1.5px solid #e75480",
            "color":"orange"
        };

        return (
            <div>
                <div className="md-form mx-auto" >
                    <input style={searchStyle} className="form-control" type="text" placeholder={this.props.search} aria-label="Search" />
                </div>
            </div>
        );
    }
}

