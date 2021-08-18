'use strict';

const axios = require('axios');

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

module.exports = getMoviesHandler;
