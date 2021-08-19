'use strict';

const axios = require('axios');

let inMemory = {};

// ----------------------------------------------------------------------------------------------------------------------------


class Movie {
  constructor(title, overview, poster, date, timeStamp) {
    this.title = title;
    this.overview = overview;
    this.poster = poster;
    this.date = date;
    this.timeStamp = timeStamp;
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

    if (inMemory[requestMovies.cityName] !== undefined) {
      console.log('requested data is in cache memory');
      res.send(inMemory[requestMovies.cityName]);
    }else{
      console.log('requested data is not in cache memory, reaching out to third party API');

      axios.get(moviesApiUrl).then((retrieveMovies) => {
        // console.log(retrieveMovies.headers.date);
        let moviesResponse = retrieveMovies.data.results.map((element) => {
          return new Movie(element.title, element.overview, element.poster_path, element.release_date, retrieveMovies.headers.date) ;
        });
        inMemory[requestMovies.cityName] = moviesResponse;
        res.send(moviesResponse);
      });
    }
  }
  catch (error) {
    console.log(error);
    res.status(500).send('error code: 500');
  }
});

// ----------------------------------------------------------------------------------------------------------------------------

module.exports = getMoviesHandler;
