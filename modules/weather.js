'use strict';

const axios = require('axios');

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

// localhost:3001/weather?lat=lat&lon=lon&q=<cityname>
let getWeatherHandler = ((req, res) => {
  try {
    let requestWeather = {
      lat: req.query.lat,
      lon: req.query.lon,
      cityName: req.query.q,
    };

    // https://api.weatherbit.io/v2.0/forecast/daily?key=<key>=1&lat=<lat>&lon=<lon>3&city=<city>
    let weatherApiUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&days=7&lat=${requestWeather.lat}&lon=${requestWeather.lon}&city=${requestWeather.cityName}`;

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

module.exports = getWeatherHandler;
