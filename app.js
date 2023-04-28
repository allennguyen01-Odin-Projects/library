const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.info = function info() {
  const readStatement = this.read ? 'have read' : 'not read yet';
  return `${this.title} by ${this.author}, ${this.pages} pages, ${readStatement}`;
};

const titleElem = document.getElementById('title');
const authorElem = document.getElementById('author');
const numPagesElem = document.getElementById('num-pages');
const haveReadElem = document.getElementById('have-read');
const submit = document.getElementById('add-book');
const inputs = document.querySelectorAll('input');
const bookGrid = document.getElementById('book-grid');

function clearInputs() {
  titleElem.value = '';
  authorElem.value = '';
  numPagesElem.value = '';
  haveReadElem.value = '';
}

function disableSubmit() {
  if (titleElem.value && authorElem.value && numPagesElem.value) {
    submit.disabled = false;
  } else {
    submit.disabled = true;
  }
}

function renderBook(book) {
  const bookCard = document.createElement('div');
  const infoGroup = document.createElement('div');
  const title = document.createElement('p');
  const author = document.createElement('p');
  const pages = document.createElement('p');
  const buttonGroup = document.createElement('div');
  const removeBtn = document.createElement('button');
  const readBtn = document.createElement('button');

  bookCard.classList.add('bg-white', 'rounded-2xl', 'border-4', 'p-4');

  infoGroup.classList.add('flex', 'flex-col', 'gap-2', 'mb-2', 'items-center');
  buttonGroup.classList.add('flex', 'flex-col', 'gap-4', 'text-black');

  removeBtn.classList.add('bg-gray-300', 'p-2', 'rounded-lg');
  readBtn.classList.add('p-2', 'rounded-lg');

  title.textContent = `"${book.title}"`;
  author.textContent = `${book.author}`;
  pages.textContent = ` Pages: ${book.pages}`;
  removeBtn.textContent = 'Remove';
  removeBtn.type = 'submit';
  readBtn.type = 'submit';

  if (book.read) {
    readBtn.classList.add('bg-green-400');
    readBtn.textContent = 'Read';
  } else {
    readBtn.classList.add('bg-red-400');
    readBtn.textContent = 'Not read';
  }

  infoGroup.appendChild(title);
  infoGroup.appendChild(author);
  infoGroup.appendChild(pages);
  buttonGroup.appendChild(readBtn);
  buttonGroup.appendChild(removeBtn);
  bookCard.appendChild(infoGroup);
  bookCard.appendChild(buttonGroup);

  bookGrid.appendChild(bookCard);
}

function addBookToLibrary() {
  const title = titleElem.value;
  const author = authorElem.value;
  const numPages = numPagesElem.value;
  const haveRead = haveReadElem.value === 'on';
  const newBook = new Book(title, author, numPages, haveRead);
  myLibrary.push(newBook);

  clearInputs();
  console.log(newBook.info());

  renderBook(newBook);
}

function renderBooks() {
  myLibrary.forEach((book) => {
    renderBook(book);
  });
}

const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, false);
const HarryPotter = new Book('Harry Potter', 'J.K. Rowling', 1000, true);
const StarWars = new Book('Star Wars', 'Luke Skywalker', -11, false);
const Mario = new Book('Mario', 'Nintendo', 12312, true);

myLibrary.push(theHobbit);
myLibrary.push(HarryPotter);
myLibrary.push(StarWars);
myLibrary.push(Mario);
myLibrary.push(Mario);
myLibrary.push(Mario);
myLibrary.push(Mario);

console.log(myLibrary);

renderBooks();
submit.addEventListener('click', addBookToLibrary);
inputs.forEach((input) => {
  input.addEventListener('change', disableSubmit);
});
