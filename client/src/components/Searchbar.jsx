import React, { Component } from 'react';
import '../stylesheets/uikit.min.css';

export default class Searchbar extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        const searchStyle = {
            "display": "inline"
        };

        return (
            <div>
                <div className="uk-container">
                    <form className="uk-search uk-search-default" style={searchStyle}>
                        <span uk-search-icon=""></span>
                        <input className="uk-search-input" type="search" placeholder="Search New Friends..." />
                    </form>
                </div>   
            </div>
        );
    }
}

