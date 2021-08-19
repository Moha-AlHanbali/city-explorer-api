'use strict';

const express = require('express');

require('dotenv').config();

const cors = require('cors');

const getWeatherHandler = require('./modules/weather.js');

const getMoviesHandler = require('./modules/movies.js');

const getYelpHandler = require('./modules/yelp.js');

// const weatherData = require('./data/weather.json');

const server = express();

const PORT = process.env.PORT;

server.use(cors());

// ----------------------------------------------------------------------------------------------------------------------------


let notFoundHandler = (req, res) => {
  res.status(404).send('error 404: page not found');
};

// ----------------------------------------------------------------------------------------------------------------------------


// ROUTES:
server.get('/weather', getWeatherHandler);
server.get('/movies', getMoviesHandler);
server.get('/yelp', getYelpHandler);
server.get('*', notFoundHandler);


server.listen(PORT, () => {
  console.log('Listening on Port:', PORT);
});




// Lab07 Material
/* ----------------------------------------------------------------------------------------------------------------------------



// localhost:3001/weather?lat=lat&lon=lon&q=<cityname>
server.get('/weather', (req, res) => {

  //   res.send('inside /weather');
  try {
    let requestWeather = {
      lat: req.query.lat,
      lon: req.query.lon,
      cityName: req.query.q,
    };

    //   console.log(requestWeather);
    //   console.log(requestWeather.cityName);


    let findWeather = weatherData.find((weather) => {
      //LOCATIONIQ COORDS DO NOT MATCH JSON FILE
      if (weather.city_name.toLowerCase() === requestWeather.cityName.toLowerCase()) {


        let response = weather.data.map(element => {
          return new Forecast(element.weather.description, element.low_temp, element.max_temp, element.datetime);
        });
        console.log(response);
        res.send(response);
      }



    });
    return findWeather;

  }

  catch (error) {
    console.log(error);
    res.status(500).send('error code: 500');
  }

});
---------------------------------------------------------------------------------------------------------------------------- */
