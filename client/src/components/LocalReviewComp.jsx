/* globals */
import React, { Component } from 'react';


class LocalReviewComp extends Component {
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
            const unwraptext = this.props.text.slice(0,300)+"...";
            const wraptext = this.props.text;
            this.setState({active: true, unwrap: unwraptext, wrap: wraptext});
        }else{
            const unwraptext = this.props.text;
            const wraptext = this.props.text;
            this.setState({ active: false, unwrap: unwraptext, wrap: wraptext });
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
                    <div className="uk-comment-body">
                        <p className="uk-comment-meta uk-margin-remove">{this.props.useful} people found useful</p>
                        {this.state.active ? <p>{this.state.unwrap}</p> : (<p>{this.state.wrap}</p>)}
                        <a className="uk-text-small uk-flex uk-flex-right" onClick={this.toggleClass}><u>{this.state.text}</u></a>
                    </div>                   
                </article>
            </tr>
        );
    }
}

export default LocalReviewComp;
