const bookmarks = [];
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

const setError = function(error) {
  this.requestError = error;
};

const getError = function() {
  return this.requestError;
};

export default {
  bookmarks,
  adding, 
  error, 
  filter,
  findById,
  addBookmark,
  findAndDeleteBookmark,
  setError,
  getError,
};