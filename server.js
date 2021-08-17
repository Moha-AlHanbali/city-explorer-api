'use strict';

const express = require('express');

require('dotenv').config();

const cors = require('cors');

const axios = require('axios');

// const weatherData = require('./data/weather.json');

const server = express();

const PORT = process.env.PORT;

server.use(cors());

// ----------------------------------------------------------------------------------------------------------------------------


class Forecast {
  constructor(description, low, high, date) {
    this.description = description;
    this.low = low;
    this.high = high;
    this.date = date;
  }
}

// ----------------------------------------------------------------------------------------------------------------------------

class Movie {
  constructor(title, overview, poster, date) {
    this.title = title;
    this.overview = overview;
    this.poster = poster;
    this.date = date;
  }
}

// ----------------------------------------------------------------------------------------------------------------------------



// localhost:3001/weather?lat=lat&lon=lon&q=<cityname>
let getWeatherHandler = ((req, res) => {
  try {
    let requestWeather = {
      lat: req.query.lat,
      lon: req.query.lon,
      cityName: req.query.q,
    };

    // https://api.weatherbit.io/v2.0/forecast/daily?key=<key>=1&lat=<lat>&lon=<lon>3&city=<city>
    let weatherApiUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&days=7&lat=${requestWeather.lat}&lon=${requestWeather.lon}&city=${requestWeather.cityName}`

    axios.get(weatherApiUrl).then((retrieveWeather) => {
      let weatherResponse = retrieveWeather.data.data.map(element => {
        return new Forecast(element.weather.description, element.low_temp, element.max_temp, element.datetime);
      });

      res.send(weatherResponse);
    });
  }
  catch (error) {
    console.log(error);
    res.status(500).send('error code: 500');
  }
});

// ----------------------------------------------------------------------------------------------------------------------------


// localhost:3001/weather?lat=lat&lon=lon&q=<cityname>

let getMoviesHandler = ((req, res) => {
  try {
    let requestMovies = {
      cityName: req.query.q,
    };

    // https://api.themoviedb.org/3/search/movie?api_key=<key>&query=<query>
    let moviesApiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${requestMovies.cityName}`;

    axios.get(moviesApiUrl).then((retrieveMovies) => {
      let moviesResponse = retrieveMovies.data.results.map((element) => {
        return new Movie (element.title, element.overview, element.poster_path, element.release_date);
      });
      res.send(moviesResponse);
    });
  }
  catch (error) {
    console.log(error);
    res.status(500).send('error code: 500');
  }
});

// ----------------------------------------------------------------------------------------------------------------------------


let notFoundHandler = (req, res) => {
  res.status(404).send('error 404: page not found');
};

// ----------------------------------------------------------------------------------------------------------------------------


// ROUTES:
server.get('/weather', getWeatherHandler);
server.get('/movies', getMoviesHandler);
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
