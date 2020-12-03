export default {
    loadFromLocalStorage,
    saveToLocalStorage
}

function loadFromLocalStorage(favMovies) {
    return JSON.parse(localStorage.getItem(favMovies));
}

function saveToLocalStorage(movieId) {
  const localStorageData = JSON.parse(localStorage.getItem('favoriteMovies'));
  if (localStorageData) {
    const favMovieIdx = localStorageData.indexOf(movieId)
    if (favMovieIdx != -1) {
      localStorageData.splice(favMovieIdx,1);
      localStorage.setItem('favoriteMovies', JSON.stringify(localStorageData));
    } else if (favMovieIdx === -1){
      localStorageData.push(movieId);
      localStorage.setItem('favoriteMovies', JSON.stringify(localStorageData));
    }
  } else {
    const newFavMovieArr = [];
    newFavMovieArr.push(movieId);
    localStorage.setItem('favoriteMovies', JSON.stringify(newFavMovieArr));
  }
}
