var config = require('./db-config.js');
var mysql = require('mysql');

config.connectionLimit = 10;
var connection = mysql.createPool(config);

/* -------------------------------------------------- */
/* ------------------- Route Handlers --------------- */
/* -------------------------------------------------- */


/* -- Query 2 -- */
/* -- Home Page get Top Restaurants -- */
function getTopRestaurants(req, res) {
  var city = req.params.city;
  var state = req.params.state;
  var category = '%' + req.params.category + '%';

  var query = `
  SELECT name, stars, review_count
  FROM Business
  WHERE city = '${city}' AND state = '${state}' AND categories LIKE '%Restaurants%' AND categories LIKE '${category}'
  ORDER BY stars DESC, review_count DESC
  LIMIT 10;`;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

/* -- Query 3 -- */
/* -- Most useful reviews of a restaurant -- */
function getTopReviews1(req, res) {
  var query = `
  SELECT review_id, text, stars, useful
  FROM Reviews
  ORDER BY useful DESC, stars DESC
  LIMIT 5;
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
}

/* -- Query 4 -- */
/* -- get top 5 similar users -- */
function getSimilarUsers(req, res) {
  var userId = parseInt(req.params.userId);

  var query = `
  SELECT user_id FROM(SELECT user_id, COUNT(*) AS cnt
  FROM (SELECT r1.user_id AS given_user_id, r2.user_id
  FROM Reviews r1
  JOIN Reviews r2 
  ON r1.business_id = r2.business_id
  WHERE r1.user_id = ${userId}) temp
  GROUP BY user_id
  ORDER BY cnt DESC) temp2
  LIMIT 5;
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });  
}

/* -- Query 5 -- */
/* -- Get Distance Between Two Restaurants -- */
function getTwoRestaurantDistance(req, res) {
  var restaurant1 = req.params.restaurant1;
  var restaurant2 = req.params.restaurant2;

  var query = `
  WITH A_loc AS
  (SELECT name AS A_business, longitude AS A_longitude, latitude AS A_latitude
  FROM Business
  WHERE name = '"${restaurant1}"'
  ),
  B_loc AS (
  SELECT name AS B_business, longitude AS B_longitude, latitude AS B_latitude
  FROM Business
  WHERE name = '"${restaurant2}"'
  ),
  AB_loc AS 
 (
  SELECT *
  FROM A_loc, B_loc
  )
  SELECT A_business, B_business,
  3956*2* ASIN(SQRT(POWER(SIN((A_latitude - abs(B_latitude))*3.1515926/180/2), 2) + COS(A_longitude * 3.1415926/180) * COS(abs(B_latitude) * 3.1415926/180)*POWER(SIN((A_longitude - B_longitude)*3.1415926/180/2), 2))) 
  AS distance
  FROM AB_loc;`;

  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });  
}

/* -- Query 6 -- */
/* Find restaurant under category X with stars higher than user input*/
function getRestaurant1(req, res) {
  var stars = parseFloat(req.params.stars);
  var category = '%' + req.params.category + '%';

  console.log(stars);
  var query = `
  SELECT name, categories, stars, review_count
  FROM Business
  WHERE categories LIKE '%Restaurants%' AND categories LIKE '${category}' AND stars > ${stars}
  ORDER BY stars DESC, review_count DESC
  LIMIT 10;
  `;

  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
}

/* -- Query 7 -- */
/* -- Get top 10 reviews at a restaurant since a given date-- */
function getTopReviews2(req, res) {

  var restaurant = req.params.restaurant;
  var date = req.params.date;

  var query = `
  SELECT text, r.stars, useful
  FROM Reviews r
  JOIN Business b
  ON r.business_id = b.business_id
  WHERE r.review_date > ${date} AND b.name = ${restaurant}
  ORDER BY useful DESC
  LIMIT 10;
  `;

  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });  
}

/* -- Query 8 -- */
/* -- Distance Between User and Restaurant */
// return NULL for distance
function getDistance(req, res) {
  var latitude = parseFloat(req.params.latitude);
  var longitude = parseFloat(req.params.longitude);
  var restaurant = req.params.restaurant;

  var query = `WITH shop_location AS(
  SELECT business_id, name, longitude, latitude
  FROM Business
  WHERE name = '"${restaurant}"'
  )
  SELECT business_id, name,
  3956 * 2 * ASIN(SQRT(POWER(SIN((33 - abs(${latitude})) * 3.1515926/180/2), 2) 
  + COS(-111.3 * 3.1415926/180) * COS(abs(${latitude}) * 3.1415926/180)  
  * POWER(SIN((-111.3 - ${longitude}) * 3.1415926/180/2), 2) )) 
  AS distance
  FROM shop_location
  ORDER BY distance ASC;`;

  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
}

/* Query 9 */
/* -- Most useful 5-star review and 1-star review at local restaurants in category ‘Y’ (only 1 branch in a city) in a city ‘X’ -- */
function getLocalReviews(req, res) {
  var city = req.params.city;
  var category = req.params.category;

  var query = `
  WITH chain as (SELECT NAME, COUNT(*) as cnt, ROUND(AVG(Stars),2) as avg_stars
  FROM Business
  WHERE city = '${city}' AND categories LIKE '%Restaurants%' AND categories LIKE '%${category}%'
  GROUP BY name
  HAVING COUNT(*) =1 
  ORDER BY avg_stars DESC, cnt DESC),
  category_cte AS (
  SELECT business_id, name
  FROM Business
  WHERE city = '${city}' AND categories LIKE '%Restaurants%' AND categories LIKE '%${category}%'),
  max_useful as (
  SELECT r.business_id, b.name, r.text, r.stars, r.useful
  FROM Reviews r
  JOIN category_cte b
  ON r.business_id = b.business_id
  JOIN (
  SELECT business_id, stars, MAX(useful) as max_use
  FROM Reviews
  GROUP BY (business_id, stars)
  HAVING MAX(useful) > 1
  ORDER BY max_use DESC, stars DESC) mm
  ON r.business_id = mm.business_id AND r.stars = mm.stars AND r.useful = mm.max_use
  WHERE r.stars = 1 or r.stars = 5
  ORDER BY business_id)
  SELECT c.name, c.avg_stars, m.useful, m.stars, m.text
  FROM chain c
  JOIN max_useful m
  ON c.name = m.name 
  ORDER BY c.avg_stars DESC, c.name ASC, m.stars DESC
  LIMIT 20;
`;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });    
}

/* --Query 10-- */
/* --10 local restaurants (only one branch in this city) in city ‘X’ with the highest percentage of five-star ratings -- */
function getTopLocal(req, res) {
  var city = req.params.city;

  var query = `
  WITH local as (SELECT business_id, COUNT(*)  
  FROM Business 
  WHERE city = '${city}' AND categories LIKE '%Restaurants%'
  GROUP BY business_id
  HAVING COUNT(*) = 1)
  SELECT b.name, b.address, f.five_star_pct, b.review_count
  FROM Business b
  JOIN (
  SELECT l.business_id, ROUND(SUM(CASE WHEN r.stars = 5 THEN 1 ELSE 0 END) / COUNT(r.review_id),2) as five_star_pct
  FROM local l
  JOIN Reviews r
  ON l.business_id = r.business_id
  GROUP BY l.business_id) f
  ON b.business_id = f.business_id
  ORDER BY f.five_star_pct DESC, b.review_count DESC
  LIMIT 10;
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });   
}

// The exported functions, which can be accessed in index.js.
module.exports = {
  getTopRestaurants: getTopRestaurants,
  getTopReviews1: getTopReviews1,
  getSimilarUsers: getSimilarUsers,
  getTwoRestaurantDistance: getTwoRestaurantDistance,
  getRestaurant1: getRestaurant1,
  getTopReviews2: getTopReviews2,
  getDistance: getDistance,
  getLocalReviews: getLocalReviews,
  getTopLocal: getTopLocal
}


