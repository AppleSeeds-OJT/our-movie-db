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
    // let jsonrecipes = JSON.parse(localStorage.getItem('savedMovies'));
    // if(jsonrecipes) {
    //   const recipeExists = jsonrecipes.find(element => element.recipe.label === label);
    //   if (!recipeExists) {
    //     jsonrecipes.push({'recipe':recipe});
    //     localStorage.setItem('savedRecipes', JSON.stringify(jsonrecipes));
    //   } else {
    //     alert('You already saved this recipe :)');
    //   }
    // } else {
    //   let newSavedRecipes = [{'recipe':recipe}];
    //   localStorage.setItem('savedRecipes', JSON.stringify(newSavedRecipes));
    // }
    // const [savedRecipes, setSavedRecipes] = useState([]);
      // useEffect(() => {
        // let jsonrecipes = JSON.parse(localStorage.getItem('savedRecipes'));
        // if(jsonrecipes) {
        //   setSavedRecipes(jsonrecipes);
        // }
      // },[]);   
      // if(!savedRecipes.length){
      //   return 'Loading Saved Recipes, Please Wait...'
      // }