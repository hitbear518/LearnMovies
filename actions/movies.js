export const REQUEST_MOVIES = 'REQUEST_MOVIES';
export const RECEIVE_MOVIES_SUCCESS = 'RECEIVE_MOVIES_SUCCESS';
export const RECEIVE_MOVIES_FAILURE = 'RECEIVE_MOVIES_FAILURE';

function requestMovies() {
  return {
    type: REQUEST_MOVIES,
  };
}

function receiveMoviesSuccess(items) {
  return {
    type: RECEIVE_MOVIES_SUCCESS,
    items,
  };
}

function receiveMoviesFailure(errorMessage) {
  return {
    type: RECEIVE_MOVIES_FAILURE,
    errorMessage,
  };
}

const API_URL = 'http://api.rottentomatoes.com/api/public/v1.0/';
const API_KEYS = [
  '7waqfqbprs7pajbz28mqf6vz',
  // 'y4vwv8m33hed9ety83jmv52f', Fallback api_key
];
function urlForQueryAndPage(query, pageNumber) {
  const apiKey = API_KEYS[0];
  if (query) {
    return `${API_URL}movies.json?apiKey=${apiKey}&q=${encodeURIComponent(query)}
      &page_limit=20&page=&${pageNumber}`;
  }
  return `${API_URL}lists/movies/in_theaters.json?` +
    `apiKey=${apiKey}&page_limit=20&page=${pageNumber}`;
}
export function fetchMovies() {
  return dispatch => {
    dispatch(requestMovies());
    return fetch(urlForQueryAndPage('', 1))
      .then(response => response.json())
      .then(responseData => { dispatch(receiveMoviesSuccess(responseData.movies)); })
      .catch(error => {
        console.warn(error);
        dispatch(receiveMoviesFailure(error.errorMessage));
      });
  };
}

