/* globals */
import React, { Component } from 'react';


class ReviewComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            active:false,
            unwrap:'',
            wrap:'',
            text: 'show more'
        }

        console.log(this.props.text.length);
        this.toggleClass = this.toggleClass.bind(this);
    }

    componentDidMount(){
        if (this.props.text.length > 300){
            const unwraptext = this.props.text.slice(0,300);
            const wraptext = this.props.text.slice(300,);
            this.setState({active: true, unwrap: unwraptext, wrap: wraptext});
        }
    }

    toggleClass() {
        const currentState = this.state.active;
        if (currentState) {
            this.setState({ text: "close"});
        } else {
            this.setState({ text: "show more" });
        }
        this.setState({ active: !currentState });

    };

    render() {
        return (
            <tr>
                <article className="uk-comment uk-visible-toggle" tabIndex="-1">
                    <div className="uk-comment-body uk-margin-top">
                        <p className="uk-comment-meta uk-margin-remove-bottom">{this.props.useful} people found useful</p>
                        {this.state.active ? <p>{this.state.unwrap}</p> : (<p>{this.state.unwrap}{this.state.wrap}</p>)}
                        <a className="uk-text-small uk-flex uk-flex-right" onClick={this.toggleClass}><u>{this.state.text}</u></a>
                    </div>
                    <header className="uk-comment-header uk-flex uk-flex-right uk-margin-top">
                        <div className="uk-width-auto">
                            <p className="uk-comment-meta uk-margin-remove-top">Posted on {this.props.date}</p>
                        </div>
                    </header>                       
                </article>
                {/* {this.state.active ? (<a className={"uk-button uk-button-default"} onClick={this.toggleClass}>{this.state.text}</a>) : (<p>{this.props.text}</p>)}    */}
            </tr>
        );
    }
}

export default ReviewComponent;
