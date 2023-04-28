const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.info = function () {
  const readStatement = this.read ? 'have read' : 'not read yet';
  return `${this.title} by ${this.author}, ${this.pages} pages, ${readStatement}`;
};

const titleElem = document.getElementById('title');
const authorElem = document.getElementById('author');
const numPagesElem = document.getElementById('num-pages');
const haveReadElem = document.getElementById('have-read');
const submit = document.getElementById('add-book');
const inputs = document.querySelectorAll('input');

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
  console.log(newBook.info());
}

function disableSubmit() {
  if (titleElem.value && authorElem.value && numPagesElem.value) {
    submit.disabled = false;
  } else {
    submit.disabled = true;
  }
}

const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, false);

myLibrary.push(theHobbit);
console.log(theHobbit.info());

submit.addEventListener('click', addBookToLibrary);
inputs.forEach((input) => {
  input.addEventListener('change', disableSubmit);
});
