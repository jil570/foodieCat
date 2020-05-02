/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { updateFile } from '../javascripts/userRequests';
import NavBar from './NavBar';
import Profile from './Profile';

class EditInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      address: '',
      category1: '' ,
      category2: '',
      longitude:'unset',
      latitude:'unset',
      message: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCategory1Change = this.handleCategory1Change.bind(this);
    this.handleCategory2Change = this.handleCategory2Change.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  handleCategory1Change(event) {
    console.log(event);
    this.setState({ category1: event });
  }

  handleCategory2Change(event) {
    console.log(event);
    this.setState({ category2: event });
  }

  handleSubmit(event) {
    event.preventDefault();

    const {
        address,
        category1,
        category2,
        message,
    } = this.state;

    if(address == ""
      || category1 == "" 
      || category2 == ""){
      alert("Please fill in all the info.");
      return;
    }

    if(category1 == category2){
      alert("Category 1 and Category 2 should be different.");
      return;
    }

    updateFile(address, category1, category2)
        .then((res) => {
            if (res.ok) {
                // eslint-disable-next-line react/prop-types
                this.props.history.push('/');
              } else {
                res.json().then((json) => {
                  this.setState({ message: json });
                });
              }
            })
            .catch(() => {
              alert("Updating");
              setTimeout(function(){ alert("Updated");}, 1000);
              this.props.history.push('/');
            });
        }

  render() {
    let { message } = this.state;

    if (message !== '') {
      message = (
        <div style={{ textAlign: 'center' }}>
          {message}
          <br />
          <br />
        </div>
      );
    } else {
      message = '';
    }

    return (
      <div>
        <NavBar />
        <div className="uk-cover-container uk-flex uk-flex-center uk-flex-middle">
          <form onSubmit={this.handleSubmit}>
            <fieldset className="uk-fieldset">
              <h2>Edit Profile</h2>
              <h4>New Address</h4>
              <div className="">
                <input onChange={this.handleChange} id="address" className="uk-input" type="text" placeholder="New Address" />
              </div>
              <h4>My 1st Favorite</h4>
              <div className="uk-margin uk-grid-small uk-child-width-auto uk-grid">
                <label htmlFor="radioJapanese">
                  <input onChange={this.handleCategory1Change.bind(this, 'Japanese')} className="uk-radio" type="radio" name="category1"/>
                  Japanese
                </label>
                <label htmlFor="radioChinese">
                  <input onChange={this.handleCategory1Change.bind(this, 'Chinese')} className="uk-radio" type="radio" name="category1" />
                  Chinese
                </label>
                <label htmlFor="radioMexican">
                  <input onChange={this.handleCategory1Change.bind(this, 'Mexican')} className="uk-radio" type="radio" name="category1" />
                  Mexican
                </label>
                <label htmlFor="radioItalian">
                  <input onChange={this.handleCategory1Change.bind(this, 'Italian')} className="uk-radio" type="radio" name="category1" />
                  Italian
                </label>
                <label htmlFor="radioIceCream">
                  <input onChange={this.handleCategory1Change.bind(this, 'Ice Cream & Frozen Yogurt')} className="uk-radio" type="radio" name="category1" />
                  Ice Cream & Frozen Yogurt
                </label>
                <label htmlFor="radioFastFood">
                  <input onChange={this.handleCategory1Change.bind(this, 'Fast Food')} className="uk-radio" type="radio" name="category1" />
                  Fast Food
                </label>
              </div>
              <h4>My 2nd Favorite</h4>
              <div className="uk-margin uk-grid-small uk-child-width-auto uk-grid">
                <label htmlFor="radioJapanese">
                  <input onChange={this.handleCategory2Change.bind(this, 'Japanese')} className="uk-radio" type="radio" name="category2"/>
                  Japanese
                </label>
                <label htmlFor="radioChinese">
                  <input onChange={this.handleCategory2Change.bind(this, 'Chinese')} className="uk-radio" type="radio" name="category2" />
                  Chinese
                </label>
                <label htmlFor="radioMexica">
                  <input onChange={this.handleCategory2Change.bind(this, 'Mexican')} className="uk-radio" type="radio" name="category2" />
                  Mexican
                </label>
                <label htmlFor="radioItalian">
                  <input onChange={this.handleCategory2Change.bind(this, 'Italian')} className="uk-radio" type="radio" name="category2" />
                  Italian
                </label>
                <label htmlFor="radioIceCream">
                  <input onChange={this.handleCategory2Change.bind(this, 'Ice Cream & Frozen Yogurt')} className="uk-radio" type="radio" name="category2" />
                  Ice Cream & Frozen Yogurt
                </label>
                <label htmlFor="radioFastFood">
                  <input onChange={this.handleCategory2Change.bind(this, 'Fast Food')} className="uk-radio" type="radio" name="category2" />
                  Fast Food
                </label>
              </div>
              {message}
              <input type="submit" className="uk-button-primary uk-button-large uk-text-large" value="Update" />
              <a className="uk-margin-top uk-margin-left uk-button-danger uk-button-large uk-text-large" href="/" value="Upload">Cancel</a>
            </fieldset>
          </form>
        </div>
      </div>
    );
  }
}


export default EditInfo;
