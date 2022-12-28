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

function clearInputs() {
  titleElem.value = '';
  authorElem.value = '';
  numPagesElem.value = '';
  haveReadElem.value = '';
}

function addBookToLibrary() {
  const title = titleElem.value;
  const author = authorElem.value;
  const numPages = numPagesElem.value;
  const haveRead = haveReadElem.value === 'on';
  const newBook = new Book(title, author, numPages, haveRead);
  myLibrary.push(newBook);
  clearInputs();
  console.log(myLibrary);
}

const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, false);

myLibrary.push(theHobbit);

const submit = document.getElementById('add-book');
submit.addEventListener('click', addBookToLibrary);

console.log(theHobbit.info());
