'use strict';

const express = require('express');

require('dotenv').config();

const cors = require('cors');

const weatherData = require('./data/weather.json');

const server = express();

const PORT = process.env.PORT;

server.use(cors());

class Forecast {
  constructor(description, low, high, date) {
    this.description = description;
    this.low = low;
    this.high = high;
    this.date = date;
  }
}

// localhost:3001/weather?lat=lat&lon=lon&q=<cityname>
server.get('/weather', (req, res) => {

  //   res.send('inside /weather');
  let requestWeather = {
    lat: req.query.lat,
    lon: req.query.lon,
    cityName: req.query.q,
  };

  //   console.log(requestWeather);
  //   console.log(requestWeather.cityName);

  let findWeather = weatherData.find((weather) => {

    //   console.log(weather.city_name.toLowerCase(), requestWeather.cityName.toLowerCase(), weather.lat, requestWeather.lat, weather.lon, requestWeather.lon);

    // if (weather.city_name.toLowerCase() === requestWeather.cityName.toLowerCase() && weather.lat === requestWeather.lat && weather.lon === requestWeather.lon) {

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

});

server.get('*', (req, res) => {
  res.status(404).send('error 404: page not found');
});

server.listen(PORT, () => {
  console.log('bbbbbb', PORT);
});

