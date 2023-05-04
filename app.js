const myLibrary = [];

const titleElem = document.getElementById('title');
const directorElem = document.getElementById('director');
const ratingElem = document.getElementById('rating');
const haveWatchedElem = document.getElementById('have-watched');
const submit = document.getElementById('new-movie');
const inputs = document.querySelectorAll('input');
const movieGrid = document.getElementById('movie-grid');
const addMovieBtn = document.getElementById('add-movie');
const movieModal = document.getElementById('movie-modal');

class Movie {
  constructor(
    title = 'Unknown',
    director = 'Unknown',
    rating = NaN,
    watched = false,
  ) {
    this.title = title;
    this.director = director;
    this.rating = rating;
    this.watched = watched;
  }

  info() {
    const watchedStatement = this.watched ? 'have watched' : 'not watched yet';
    return `${this.title} by ${this.director}, ${this.rating} stars, ${watchedStatement}`;
  }
}

function clearInputs() {
  titleElem.value = '';
  directorElem.value = '';
  ratingElem.value = 3;
  haveWatchedElem.value = '';
}

function disableSubmit() {
  if (titleElem.value && directorElem.value && ratingElem.value) {
    submit.disabled = false;
  } else {
    submit.disabled = true;
  }
}

function openNewMovieModal() {
  movieModal.hidden = false;
}

function closeNewMovieModal() {
  movieModal.hidden = true;
}

function toggleWatched(movie, watchedBtn) {
  movie.watched = !movie.watched;

  if (movie.watched) {
    watchedBtn.classList.remove('bg-red-400');
    watchedBtn.classList.add('bg-green-400');
    watchedBtn.textContent = 'Watched';
  } else {
    watchedBtn.classList.remove('bg-green-400');
    watchedBtn.classList.add('bg-red-400');
    watchedBtn.textContent = 'Not watched';
  }
}

function removeMovie(movie, movieCard) {
  myLibrary.splice(myLibrary.indexOf(movie), 1);
  movieCard.remove();
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

  movieCard.classList.add(
    'bg-white',
    'rounded-2xl',
    'border-4',
    'p-4',
    'font-normal',
    'flex',
    'flex-col',
    'justify-between',
  );

  infoGroup.classList.add('flex', 'flex-col', 'gap-2', 'mb-2', 'items-center');
  buttonGroup.classList.add('flex', 'flex-col', 'gap-4', 'text-black');

  removeBtn.classList.add('bg-gray-300', 'p-2', 'rounded-lg');
  watchedBtn.classList.add('p-2', 'rounded-lg');
  title.classList.add('font-bold', 'text-lg', 'text-center');

  title.textContent = `"${movie.title}"`;
  director.textContent = `${movie.director}`;
  watched.textContent = `Rating: ${movie.rating} stars`;
  removeBtn.textContent = 'Remove';
  removeBtn.type = 'submit';
  watchedBtn.type = 'submit';

  watchedBtn.addEventListener('click', () => {
    toggleWatched(movie, watchedBtn);
  });

  removeBtn.addEventListener('click', () => {
    removeMovie(movie, movieCard);
  });

  if (movie.watched) {
    watchedBtn.classList.add('bg-green-400');
    watchedBtn.textContent = 'Watched';
  } else {
    watchedBtn.classList.add('bg-red-400');
    watchedBtn.textContent = 'Not watched';
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

function addMovieToLibrary(e) {
  e.preventDefault();
  const title = titleElem.value;
  const director = directorElem.value;
  const rating = ratingElem.value;
  const haveWatched = haveWatchedElem.value === 'watched';
  console.log(haveWatched);
  const newMovie = new Movie(title, director, rating, haveWatched);
  myLibrary.push(newMovie);

  console.log(newMovie.info());
  renderMovie(newMovie);
}

function renderMovies() {
  myLibrary.forEach((movie) => {
    renderMovie(movie);
  });
}

const theHobbit = new Movie(
  'The Hobbit: An Unexpected Journey',
  'Peter Jackson',
  5,
  false,
);
const HarryPotter = new Movie(
  "Harry Potter and the Sorcerer's Stone",
  'Chris Columbus',
  4,
  true,
);
const StarWars = new Movie(
  'Star Wars: The Force Awakens',
  'J.J. Abrams',
  5,
  false,
);
const Avatar = new Movie('Avatar: The Way of Water', 'James Cameron', 3, true);

myLibrary.push(theHobbit);
myLibrary.push(HarryPotter);
myLibrary.push(StarWars);
myLibrary.push(Avatar);

console.log(myLibrary);

renderMovies();

submit.addEventListener('click', (e) => {
  addMovieToLibrary(e);
  clearInputs();
  disableSubmit();
  closeNewMovieModal();
});

inputs.forEach((input) => {
  input.addEventListener('change', disableSubmit);
});

addMovieBtn.addEventListener('click', openNewMovieModal);

window.addEventListener('click', (event) => {
  if (event.target === movieModal) {
    closeNewMovieModal();
  }
});
