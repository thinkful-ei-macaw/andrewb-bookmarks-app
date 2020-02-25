const bookmarks = [
  {
    id: 'x56w',
    title: 'Title 1',
    rating: 3,
    url: 'http://www.title1.com',
    description: 'lorem ipsum dolor sit',
    expanded: false
  }
];

let adding = false;
let error = null;
let filter = 0;

const findById = function (id) {
  return this.bookmarks.find(currentItem => currentItem.id === id);
};

const addBookmark = function (item) {
  this.bookmarks.push(item);
};

const findAndDeleteBookmark = function (id) {
  this.bookmarks = this.bookmarks.filter(currentItem => currentItem.id !== id);
};

// add rating function

const setError = function(error) {
  this.requestError = error;
};

const getError = function() {
  return this.requestError;
};

export default {
  bookmarks,
  findById,
  addBookmark,
  findAndDeleteBookmark,
  setError,
  getError,
};