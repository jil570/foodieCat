import React, { Component } from 'react';
import NavBar from './NavBar';
import { rgba } from 'polished';
import Searchbar from './Searchbar';
import FriendCard from './FriendCard';
import image from '../images/slide-5.jpg';
import { getUser } from '../javascripts/userRequests';
import { getLikes } from '../javascripts/postRequests';
import {Tab, Tabs} from 'react-bootstrap';
import '../stylesheets/friend-restaurant.css';

class Restaurant extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recommendRests: [{ "firstname": "Jialin", "lastname": "Lou", "address": "3900 City Ave.", "first": "Japanese", "second": "Chinese" }, { "firstname": "Yiwen", "lastname": "Tang", "address": "3910 City Ave.", "first": "Japanese", "second": "Chinese" }, { "firstname": "Yi-Nung", "lastname": "Huang", "address": "3920 City Ave.", "first": "Japanese", "second": "Chinese" }, { "firstname": "Chenyuan", "lastname": "Li", "address": "3930 City Ave.", "first": "Japanese", "second": "Chinese" }],
            rests: [{ "firstname": "Jialin", "lastname": "Lou", "address": "3900 Chestnut Ave.", "first": "Japanese", "second": "Chinese" }, { "firstname": "Yiwen", "lastname": "Tang", "address": "3910 Chestnut Ave.", "first": "Japanese", "second": "Chinese" }, { "firstname": "Yi-Nung", "lastname": "Huang", "address": "3920 Chestnut Ave.", "first": "Japanese", "second": "Chinese" }, { "firstname": "Chenyuan", "lastname": "Li", "address": "3930 Chestnut Ave.", "first": "Japanese", "second": "Chinese" }]
        }
    }

    render() {
        const titleStyle = {
            "height": "auto",
            "textAlign": "center",
            "borderRadius": "6px",
            "display": "block",
            "color": "#8b0000"
        };
        const { recommendRests, rests } = this.state;
        const recommendRestCards = [];
        const restCards = [];

        recommendRests.forEach((recommendRest) => {
            console.log(recommendRest);
            recommendRestCards.push(<FriendCard id={"rfcard-" + ""} /*onClick={() => this.showRecommendFriends(user)}*/ fullname={recommendRest.firstname + " " + recommendRest.lastname} address={recommendRest.address} first={recommendRest.first} second={recommendRest.second} />);
        });

        rests.forEach((rest) => {
            console.log(rest);
            restCards.push(<FriendCard id={"rfcard-" + ""} /*onClick={() => this.showRecommendFriends(user)}*/ fullname={rest.firstname + " " + rest.lastname} address={rest.address} first={rest.first} second={rest.second} />);
        });

        return (
            <div>
                <NavBar />
                <div
                    id="slideshow"
                    className="uk-cover-container uk-background-secondary uk-flex uk-light uk-flex-center uk-flex-middle uk-height-viewport uk-background-cover"
                    data-uk-height-viewport="true"
                    style={{ backgroundImage: `url(${image})` }}
                >
                    <div className="col-sm-10 mx-auto p-4" style={{ backgroundColor: rgba(255, 255, 255, 0.4), "borderRadius": "6px" }}>
                        <Tabs defaultActiveKey="myRest" id="myRest-recRest-tab">
                            <Tab eventKey="myRest" title="My Restaurants">
                                <br />
                                <h5 className="mx-auto" style={titleStyle}>Visited Restaurants</h5>
                                <br />
                                <Searchbar search="Search Visited Restaurant" />
                                <br />
                                <div className="row">
                                    {restCards}
                                </div>
                            </Tab>
                            <Tab eventKey="recRest" title="New Restaurants">
                                <br />
                                <h5 className="mx-auto" style={titleStyle}>Recommend Restaurants</h5>
                                <br />
                                <Searchbar search="Search New Restaurant" />
                                <br />
                                <div className="row">
                                    {recommendRestCards}
                                </div>
                            </Tab>
                        </Tabs>
                    </div>
                </div>
            </div>
        );
    }
}

export default Restaurant;
