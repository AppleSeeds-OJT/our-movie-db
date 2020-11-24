import httpService from './httpService.js';

export default {
    query,
    getExternalId,
    getById
}

// ohad's TMDB API Key:
const API_KEY_TMDB = 'e5a2122bd03016f587131ffe3ecc2596'; 
// ohad's OMDB API Key:
const API_KEY_OMDB = '9fadc571';

// TMDB base API
const BASE_URL_TMDB = 'https://api.themoviedb.org/3/movie/';
// OMDB base API
const BASE_URL_OMDB = `http://www.omdbapi.com/`;

function query(what) { // this fetches first 20 most popuplar movies from TMDB.
    // example API string: https://api.themoviedb.org/3/movie/popular?api_key=e5a2122bd03016f587131ffe3ecc2596&language=en-US&page=1
    return httpService.get(`${BASE_URL_TMDB}${what}?api_key=${API_KEY_TMDB}&language=en-US&page=1`);
}

function getExternalId(TMDBid) { // this fetches the IMDB-ID of a specific movie from TMDB.
    // example API string: https://api.themoviedb.org/3/movie/{movie_id}/external_ids?api_key=e5a2122bd03016f587131ffe3ecc2596
    return httpService.get(`${BASE_URL_TMDB}${TMDBid}/external_ids?api_key=${API_KEY_TMDB}`);
}

function getById(IMDBid) { // this fetches more movie details from OMDB, based on the IMDB-ID.
    // example API string: http://www.omdbapi.com/?i=tt3896198&apikey=9fadc571
    return httpService.get(`${BASE_URL_OMDB}?i=${IMDBid}&apikey=${API_KEY_OMDB}`);
}
