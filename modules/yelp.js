'use strict';

const axios = require('axios');

let inMemory = {};


// ----------------------------------------------------------------------------------------------------------------------------

class Yelp {
  constructor(businesseName, image, reviews, category, rating, price, timeStamp) {
    this.businesseName = businesseName;
    this.image = image;
    this.reviews = reviews;
    this.category = category;
    this.rating = rating;
    this.price = price;
    this.timeStamp = timeStamp;
  }
}

// ----------------------------------------------------------------------------------------------------------------------------

// localhost:3001/yelp


// localhost:3001/weather?lat=lat&lon=lon&q=<cityname>
let getYelpHandler = ((req, res) => {


  try {
    let requestYelp = {
      cityName: req.query.q,
    };

    // https://api.yelp.com/v3/businesses/search
    let yelpApiUrl = `https://api.yelp.com/v3/businesses/search?location=${requestYelp.cityName}&term=restaurants&limit=5`;

    if (inMemory[requestYelp.cityName] !== undefined) {
      console.log('requested data is in cache memory');
      res.send(inMemory[requestYelp.cityName]);
    } else {
      console.log('requested data is not in cache memory, reaching out to third party API');

      axios.get(
        yelpApiUrl,
        {
          headers: {
            Authorization: `Bearer ${process.env.YELP_API_KEY}`,
          }
        }
      ).then((retrieveYelp) => {
        // console.log(retrieveYelp.data);
        let yelpResponse = retrieveYelp.data.businesses.map((element) => {
          return new Yelp(element.name, element.image_url, element.review_count, element.categories[0].title, element.rating, element.price, retrieveYelp.headers.date);
        });
        inMemory[requestYelp.cityName] = yelpResponse;
        res.send(yelpResponse);
      });
    }
  }
  catch (error) {
    console.log(error);
    res.send(error);
  }
});

// ----------------------------------------------------------------------------------------------------------------------------


module.exports = getYelpHandler;
