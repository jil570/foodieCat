const bodyParser = require('body-parser');
const express = require('express');
var routes = require("./routes.js");
const cors = require('cors');

const app = express.Router();

// app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));

/* ---------------------------------------------------------------- */
/* ------------------- Route handler registration ----------------- */
/* ---------------------------------------------------------------- */




/* ---- Home ---- */
// The route localhost:8081/genres is registered to the function
// routes.getTopRestaurants, specified in routes.js.
//Query 2
app.get('/home/:city/:category', routes.getTopRestaurants); //good

//Query 2.1 (default without selecting city or category)
app.get('/home/usa', routes.getTopRestaurantsUSA);

/* --Discover Users Page-- */
//Query 3
//Most useful reviews
app.get('/reviews', routes.getTopReviews1); //good

//Query 4
app.get('/users/:userId', routes.getSimilarUsers); //not implemented yet

/* --Discover Restaurants Page-- */
//Query 5
//Distance between two restaurants
app.get('/distance/:restaurant1/:restaurant2', routes.getTwoRestaurantDistance); // returned NULL

//Query 6
//Find restaurant under category X with stars higher than user input
app.get('/restaurant/:stars/:category', routes.getRestaurant1); //good

//Query 7
//Get top 10 reviews at a restaurant since a given date
app.get('/reviews/:restaurant/:date', routes.getTopReviews2); //not implemented yet

//Query 8
//Distance Between User and Restaurant
app.get('/distance/:latitude/:longitude/:restaurant', routes.getDistance); //returns NULL

//Query 9
//Local Restaurant Reviews
app.get('/local/:city/:category', routes.getLocalReviews); //

//Query 10
//Local Top Restaurants
app.get('/local/:city', routes.getTopLocal);

//Query 11
//Multiple Categories
app.get('/restaurant/:stars/:category1/:category2', routes.getRestaurant2);

//Query 12
// returns restaurant name, avg stars, review text, and distance for user location
app.get('/restaurant/:stars/:category1/:category2/:latitude/:longitude', routes.getRestaurant3);

//Query 13
// returns recommendations for two users
app.get('/recommendations/:latitude/:longitude/:category1/:category2', routes.getRecommendations);

// app.listen(8081, () => {
// 	console.log(`Server listening on PORT 8081`);
// });
module.exports = app;
