const input = document.getElementById('input');
const moviesBox = document.getElementById('movies');
/* This array will be empty when page loads. When the `fetch`
 * succeeds the array will be full of movies. This means that we
 * can only search for movies when the movies have loaded. But we
 * can still add event listeners that searches the movies before
 * we have the movies */
let globalMovieList = [];

/* Load all movies initially */
fetchMovies();

/* Listen to events being triggered on the input field */
input.addEventListener('keyup', function () {
  let htmlBlock = '';
  /* The global movielist is empty if we would search directly
   * when we get to the page. But it will be populated when
   * the fetch is compeleted. Loop through every movie
   * */
  for(let movie of globalMovieList){
    /* If the rating of the movie is above the value that
     * we have entered in the input-field: add it to the html
     * that we will later append to the dom */
    if(movie.rating >= input.value){
      htmlBlock += `<p>${movie.title} - ${movie.rating}</p>`;
    }
  }
  /* When we have gone through all movies, add the produced HTML
   * to the DIV in the HTML */
  moviesBox.innerHTML = htmlBlock;
})

function fetchMovies(){
  fetch('http://fed17.herokuapp.com/popular-movies')
    .then(function(response) {
      return response.json()
    })
    .then(function(movies) {
      /* Store the list globally so we can access it from
       * event listeners and other functions */
      globalMovieList = movies;
      /* Then loop trough all movies */
      let htmlBlock = '';
      for (const movie of movies) {
        htmlBlock += `
          <p>${movie.title} - ${movie.rating}</p>
        `;
      }
      moviesBox.innerHTML = htmlBlock;
    })
    .catch(function(error) {
      console.log(error);
    });
}