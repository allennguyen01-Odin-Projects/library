const myLibrary = [];

function Movie(title, director, rating, watched) {
  this.title = title;
  this.director = director;
  this.rating = rating;
  this.watched = watched;
}

Movie.prototype.info = function info() {
  const watchedStatement = this.watched ? 'have watched' : 'not watched yet';
  return `${this.title} by ${this.director}, ${this.rating} stars, ${watchedStatement}`;
};

const titleElem = document.getElementById('title');
const directorElem = document.getElementById('director');
const ratingElem = document.getElementById('rating');
const haveWatchedElem = document.getElementById('have-watched');
const submit = document.getElementById('add-movie');
const inputs = document.querySelectorAll('input');
const movieGrid = document.getElementById('movie-grid');

function clearInputs() {
  titleElem.value = '';
  directorElem.value = '';
  ratingElem.value = '';
  haveWatchedElem.value = '';
}

function disableSubmit() {
  if (titleElem.value && directorElem.value && ratingElem.value) {
    submit.disabled = false;
  } else {
    submit.disabled = true;
  }
}

function renderMovie(movie) {
  const movieCard = document.createElement('div');
  const infoGroup = document.createElement('div');
  const title = document.createElement('p');
  const director = document.createElement('p');
  const watched = document.createElement('p');
  const buttonGroup = document.createElement('div');
  const removeBtn = document.createElement('button');
  const watchedBtn = document.createElement('button');

  movieCard.classList.add('bg-white', 'rounded-2xl', 'border-4', 'p-4');

  infoGroup.classList.add('flex', 'flex-col', 'gap-2', 'mb-2', 'items-center');
  buttonGroup.classList.add('flex', 'flex-col', 'gap-4', 'text-black');

  removeBtn.classList.add('bg-gray-300', 'p-2', 'rounded-lg');
  watchedBtn.classList.add('p-2', 'rounded-lg');

  title.textContent = `"${movie.title}"`;
  director.textContent = `${movie.director}`;
  watched.textContent = `Rating: ${movie.rating}`;
  removeBtn.textContent = 'Remove';
  removeBtn.type = 'submit';
  watchedBtn.type = 'submit';

  if (movie.watched) {
    watchedBtn.classList.add('bg-green-400');
    watchedBtn.textContent = 'Watched';
  } else {
    watchedBtn.classList.add('bg-red-400');
    watchedBtn.textContent = 'Not watched yet';
  }

  infoGroup.appendChild(title);
  infoGroup.appendChild(director);
  infoGroup.appendChild(watched);
  buttonGroup.appendChild(watchedBtn);
  buttonGroup.appendChild(removeBtn);
  movieCard.appendChild(infoGroup);
  movieCard.appendChild(buttonGroup);

  movieGrid.appendChild(movieCard);
}

function addMovieToLibrary() {
  const title = titleElem.value;
  const director = directorElem.value;
  const rating = ratingElem.value;
  const haveWatched = haveWatchedElem.value;
  const newMovie = new Movie(title, director, rating, haveWatched);
  myLibrary.push(newMovie);

  console.log(newMovie.info());
  clearInputs();
  disableSubmit();
  renderMovie(newMovie);
}

function renderMovies() {
  myLibrary.forEach((movie) => {
    renderMovie(movie);
  });
}

const theHobbit = new Movie('The Hobbit', 'J.R.R. Tolkien', 5, false);
const HarryPotter = new Movie('Harry Potter', 'J.K. Rowling', 1, true);
const StarWars = new Movie('Star Wars', 'Luke Skywalker', 2, false);
const Mario = new Movie('Mario', 'Nintendo', 3, true);

myLibrary.push(theHobbit);
myLibrary.push(HarryPotter);
myLibrary.push(StarWars);
myLibrary.push(Mario);
myLibrary.push(Mario);
myLibrary.push(Mario);
myLibrary.push(Mario);

console.log(myLibrary);

renderMovies();
submit.addEventListener('click', addMovieToLibrary);
inputs.forEach((input) => {
  input.addEventListener('change', disableSubmit);
});
