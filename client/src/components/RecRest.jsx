/* globals */

import React, { Component } from 'react';
import { rgba } from 'polished';
import '../stylesheets/auth-pages-style.css';
import image from '../images/slide-5.jpg';
import NavBar from './NavBar';
import { getUser } from '../javascripts/userRequests';
import RestComponent from './RestComponent';

class RecRestaurant extends Component {
    constructor(props) {
        super(props);

        this.state={
            longitude:'',
            latitude:'',
            category1:'',
            category2:'',
            // min_star:0
            restaurantCat1: [],
            restaurantCat2: [],
            filterCat1:[],
            filterCat2:[],
            showRests:[],
            showCat:1,
            noresult: false
        }
        
        this.handleChangeStar = this.handleChangeStar.bind(this);
        this.handlePreference = this.handlePreference.bind(this);
    }
    componentDidMount() {
        getUser()
            .then((data) => {
                data.json()
                    .then((userInfo) => {
                        this.setState({
                            longitude: userInfo.longitude,
                            latitude: userInfo.latitude,
                            category1: userInfo.category1,
                            category2: userInfo.category2
                        });
                        console.log(userInfo);
                    }).then(() => {console.log("hello");
                        if (this.state.category1 === '' || this.state.category2 === '' || this.state.longitude === 'unset'){
                            var ask = window.confirm("You haven't set your profile yet. \nClick OK to go to edit profile page to set your address.");
                            if (ask) { window.location.href = "/editinfo" };
                            return;
                        }
                        Promise.all([
                            fetch("http://localhost:9000/restaurant/recommend/" + this.state.latitude + '/' + this.state.longitude + '/' + this.state.category1, { method: "GET" }),
                            fetch("http://localhost:9000/restaurant/recommend/" + this.state.latitude + '/' + this.state.longitude + '/' + this.state.category2, { method: "GET" })
                        ]).then(([res1, res2]) => (Promise.all([res1.json(), res2.json()])), err => {
                                console.log(err);
                        }).then(([data1, data2]) => {
                            // console.log(data1);
                            // console.log(data2);
                            this.setState({
                                restaurantCat1: data1,
                                restaurantCat2: data2
                            })

                                // let restaurantObj = restaurantList.map((rest, i) =>
                                //     // console.log(rest.stars)
                                //     <RestComponent restname={rest.name} categories={rest.categories} star={rest.stars} />
                                // );
                                //This saves our HTML representation of the data into the state, which we can call in our render function
                                // if (restaurantList.length === 0) {
                                //     var ask = window.confirm("We're sorry that there is no restaurant matching your preferences :( \nDo you want to go and edit your preferences?");
                                //     if (ask) { window.location.href = "/editinfo" };
                                // } else {
                                //     this.setState({
                                //         restaurants: restaurantList
                                //     });
                                //     console.log(restaurantList);
                                // }
                            });})
                    .catch(() => { });
            })
            .catch(() => { });

    //     fetch("http://localhost:9000/restaurant/recommend/" + this.state.latitude + '/' + this.state.longitude + '/' + this.state.category1,
    //         {
    //             method: "GET"
    //         }).then(res => {
    //             console.log("did you get?");
    //             console.log(res);
    //             return res.json();
    //         }, err => {
    //             console.log(err);
    //         }).then(restaurantList => {
    //             console.log(restaurantList);
    //             // let restaurantObj = restaurantList.map((rest, i) =>
    //             //     // console.log(rest.stars)
    //             //     <RestComponent restname={rest.name} categories={rest.categories} star={rest.stars} />
    //             // );
    //             //This saves our HTML representation of the data into the state, which we can call in our render function
    //             if (restaurantList.length === 0) {
    //                 var ask = window.confirm("We're sorry that there is no restaurant matching your preferences :( \nDo you want to go and edit your preferences?");
    //                 if (ask) { window.location.href = "/editinfo" };
    //             } else {
    //                 this.setState({
    //                     restaurants: restaurantList
    //                 });
    //                 console.log(restaurantList);
    //             }
    //         });
    // })
    //                 .catch(() => { });
    //         })
    //         .catch (() => { });
    }

    handleChangeStar(event) {
        let filter = event.target.value;
        console.log(filter);
        console.log(this.state.restaurants);
        let allCat1 = this.state.restaurantCat1;
        let allCat2 = this.state.restaurantCat2;
        let filterCat1 = allCat1.filter(rest=> rest.avg_stars >= filter);
        let filterCat2 = allCat2.filter(rest =>rest.avg_stars >= filter);
        console.log(filterCat1);
        console.log(filterCat2);

        var output1 = [];
        filterCat1.forEach(function (item) {
            var existing = output1.filter(function (v, i) {
                return v.business_id === item.business_id;
            });
            if (existing.length) {
                var existingIndex = output1.indexOf(existing[0]);
                output1[existingIndex].text = output1[existingIndex].text.concat(item.text);
                output1[existingIndex].useful = output1[existingIndex].useful.concat(item.useful);
                output1[existingIndex].review_date = output1[existingIndex].review_date.concat(item.review_date);
            } else {
                if (typeof item.text == 'string')
                    item.text = [item.text];
                if (typeof item.review_date == 'string')
                    item.review_date = [item.review_date];
                if (typeof item.useful == 'number')
                    item.useful = [item.useful];
                output1.push(item);
            }
        });

        console.log(output1)

        var output2 = []
        filterCat2.forEach(function (item) {
            var existing = output2.filter(function (v, i) {
                return v.business_id === item.business_id;
            });
            if (existing.length) {
                var existingIndex = output2.indexOf(existing[0]);
                output2[existingIndex].text = output2[existingIndex].text.concat(item.text);
                output2[existingIndex].useful = output2[existingIndex].useful.concat(item.useful);
                output2[existingIndex].review_date = output2[existingIndex].review_date.concat(item.review_date);
            } else {
                if (typeof item.text == 'string')
                    item.text = [item.text];
                if (typeof item.review_date == 'string')
                    item.review_date = [item.review_date];
                if (typeof item.useful == 'number')
                    item.useful = [item.useful];
                output2.push(item);
            }
        });

        console.log(output2);

        let filterOutput1 = output1.map((rest, i) =>
            <RestComponent key={rest.business_id} restname={rest.name} texts={rest.text} star={rest.avg_stars} address={rest.address} city={rest.city} state={rest.state} dist={rest.distance} review_dates={rest.review_date} review_useful={rest.useful} />);

        let filterOutput2 = output2.map((rest, i) =>
            <RestComponent key={rest.business_id} restname={rest.name} texts={rest.text} star={rest.avg_stars} address={rest.address} city={rest.city} state={rest.state} dist={rest.distance} review_dates={rest.review_date} review_useful={rest.useful} />);

        this.setState({ filterCat1: filterOutput1, filterCat2: filterOutput2});
        if (this.state.showCat === 1){
            this.setState({ showRests: filterOutput1});
            if (filterOutput1.length === 0){
                this.setState({noresult:true});
            }else {
                this.setState({ noresult:false });
            }
        }else if (this.state.showCat === 2){
            this.setState({ showRests: filterOutput2});
            if (filterOutput2.length === 0) {
                this.setState({ noresult: true });
            } else {
                this.setState({ noresult: false });
            }
        }
    }


    handlePreference(event) {
        var category1 = this.state.category1;
        var category2 = this.state.category2;
        var cat1 = this.state.filterCat1;
        var cat2 = this.state.filterCat2;
        if (event.target.value === category1){
            if (cat1.length === 0) {
                // var ask = window.confirm("Sorry, we cannot find any restaurant for you. \nDo you want to edit your preferences in profile ?");
                // if (ask) { window.location.href = "/editinfo" };
                // return;
                this.setState({ showRests: cat1, showCat: 1, noresult: true });
            } else {
                this.setState({ showRests: cat1, showCat: 1, noresult:false});
            }
        } else if (event.target.value === category2){
            if (cat2.length === 0){
                // var ask = window.confirm("Sorry, we cannot find any restaurant for you. \nDo you want to edit your preferences in profile ?");
                // if (ask) { window.location.href = "/editinfo" };
                // return;
                this.setState({ showRests: cat2, showCat: 2, noresult: true });
            }else{
                this.setState({ showRests: cat2, showCat: 2, noresult: false });
            }
        }
    }


    render() {
        return (
            <div>
                <NavBar />
                <div
                    id="slideshow"
                    className="uk-cover-container uk-background-secondary uk-flex uk-light uk-flex-center uk-flex-middle uk-height-viewport uk-background-cover"
                    data-uk-height-viewport="true"
                    style={{ backgroundImage: `url(${image})` }}>
                    <div className="uk-border-rounded uk-padding-large uk-width-3-4 uk-position-z-index" uk-scrollspy="cls: uk-animation-fade" style={{ backgroundColor: rgba(0, 0, 0, 0.7)}}>
                        <h2 className="uk-text-center uk-text-uppercase"><span>Recommended Restaurant</span></h2>
                        <div className="uk-margin-remove">                        
                            <a href="/editInfo" className="uk-text-small uk-flex uk-flex-right" uk-icon="file-edit"><u>Edit Preference</u></a>
                            <h4 className="uk-text-center uk-margin-remove-top">1st preference: {this.state.category1}<br />2nd preference: {this.state.category2}</h4>
                            <hr/>
                        </div>
                        <form className="uk-form-stacked uk-text-center">
                            <fieldset className="uk-fieldset">
                                <div className="uk-width-1 uk-margin-top uk-margin-bottom" >
                                    <label>Show recommended restaurants with </label>
                                    <select className="uk-select uk-width-auto" onChange={this.handleChangeStar}>
                                        <option value> -- select a number --</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </select> <label>stars or more</label>
                                    </div>
                                <div className="uk-width-1 uk-margin-bottom">
                                        <label>According to your </label>
                                        <select className="uk-select uk-width-auto" onChange={this.handlePreference}>
                                            <option value> -- select your preference --</option>
                                            <option value={this.state.category1}>1st - {this.state.category1}</option>
                                            <option value={this.state.category2}>2nd - {this.state.category2}</option>
                                        </select> <label>preference</label>  
                                </div>
                            </fieldset>
                        </form>
                        <hr/>
                            <ul className="uk-list uk-list-large">
                                {/* <RestComponent text="xxxxxxx" /> */}
                                {this.state.noresult ? (<p className="uk-text-center">Sorry, there is no restaurant under this recommendation :(</p>): this.state.showRests}
                            </ul>
                        </div>
                </div>
            </div>
        );
    }
}

export default RecRestaurant;
