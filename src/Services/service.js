import httpService from './httpService.js';

export default {
    query,
    getMovieById,
    getByMovieName,
    getFiveRandomMovies
    // getById,
    // getExternalId
}

// ohad's TMDB API Key:
const API_KEY_TMDB = 'e5a2122bd03016f587131ffe3ecc2596'; 
// ohad's OMDB API Key:
const API_KEY_OMDB = '9fadc571';

// TMDB base API
const BASE_URL_TMDB = 'https://api.themoviedb.org/3/';
// const BASE_URL_TMDB = 'https://api.themoviedb.org/3/discover/movie';
// OMDB base API
const BASE_URL_OMDB = 'http://www.omdbapi.com/';

function query(what) { // this fetches first 20 most popuplar movies from TMDB.
    // example API string for finding the 20 most recent movies released, from the "discover" API: 
    // https://api.themoviedb.org/3/discover/movie?api_key=e5a2122bd03016f587131ffe3ecc2596&language=en-US&sort_by=primary_release_date.desc&include_adult=false&include_video=false&page=1
    if (what === 'latest') {
        //return httpService.get(`${BASE_URL_TMDB}discover/movie/?api_key=${API_KEY_TMDB}&language=en-US&sort_by=release_date.desc&include_adult=false&include_video=false&page=1`);
       //https://api.themoviedb.org/3/movie/now_playing?api_key=<<api_key>>&language=en-US&page=1&region=ISR
         return httpService.get(`${BASE_URL_TMDB}movie/now_playing?api_key=${API_KEY_TMDB}&language=en-US&page=1&region=US`);
    } else if (what === 'popular') {
    // example API string for finding the 20 most popular movies, from the "popular" API:
    // return httpService.get(`${BASE_URL_TMDB}movie/${what}?api_key=${API_KEY_TMDB}&language=en-US&page=1`);

    // example API string for finding the 20 most popular movies, from the "discover" API:
    // https://api.themoviedb.org/3/discover/movie?api_key=e5a2122bd03016f587131ffe3ecc2596&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1
    return httpService.get(`${BASE_URL_TMDB}discover/movie/?api_key=${API_KEY_TMDB}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`);
    } else if (what === 'trending'){
    // example API string for weekly trending movie from TMDB: https://api.themoviedb.org/3/trending/movie/week?api_key=e5a2122bd03016f587131ffe3ecc2596
        return httpService.get(`${BASE_URL_TMDB}trending/movie/week?api_key=${API_KEY_TMDB}`);
    }
}

// function getExternalId(TMDBid) { // this fetches the IMDB-ID of a specific movie from TMDB.
//     // example API string: https://api.themoviedb.org/3/movie/{movie_id}/external_ids?api_key=e5a2122bd03016f587131ffe3ecc2596
//     return httpService.get(`${BASE_URL_TMDB}movie/${TMDBid}/external_ids?api_key=${API_KEY_TMDB}`);
// }

function getMovieById(TMDBid) { // this fetches more movie details from TMDB, based on the TMDB-ID.
    // example API string by TMDB-ID: https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US
    return httpService.get(`${BASE_URL_TMDB}movie/${TMDBid}?api_key=${API_KEY_TMDB}&language=en-US`);
}

// function getMovieById(IMDBid) { // this fetches more movie details from OMDB, based on the IMDB-ID.
//     // example API string by IMDB-ID: http://www.omdbapi.com/?i=tt3896198&apikey=9fadc571
//     return httpService.get(`${BASE_URL_OMDB}?i=${IMDBid}&apikey=${API_KEY_OMDB}`);
// }

function getByMovieName(movieName) { // this fetches more movie details from OMDB, based on the movie's name.
    // example API string by movie name: http://www.omdbapi.com/?t=avatar+5&apikey=9fadc571
    // first need to format the string the way that OMDB expects it:
    const formattedMovieName = movieName.split(' ').join('+'); 
    return httpService.get(`${BASE_URL_OMDB}?t=${formattedMovieName}&apikey=${API_KEY_OMDB}`);
}


// function getFiveRandomMovies(moviesArr) { // the "While loop" kills it !
//     const fiveRandomMovies = new Set();
//     const isNotFiveMovies = fiveRandomMovies.size < 5;
//     while (isNotFiveMovies) {
//         const randomMovieIndex = Math.floor(Math.random() * moviesArr.length)
//         const randomMovie = moviesArr[randomMovieIndex];
//         fiveRandomMovies.add(randomMovie);
//     }
//     return fiveRandomMovies;
// } 

function getFiveRandomMovies(moviesArr) {
    const originalMoviesArr = [...moviesArr];
    const fiveRandomMovies = []; 
    for (let i = 0; i < 5; i++) {
        const randomMovieIdx = Math.floor(Math.random() * originalMoviesArr.length);
        fiveRandomMovies.push(originalMoviesArr[randomMovieIdx]);
        originalMoviesArr.splice(randomMovieIdx,1);
    }
    return fiveRandomMovies
} 

// function getFiveRandomMovies(moviesArr) {
//     return moviesArr.slice(0,5);
// } 