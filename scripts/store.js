const bookmarks = [];
let adding = false;
let error = null;
let filter = 0;
let expanded = false;

const findById = function (id) {
  return this.bookmarks.find(currentItem => currentItem.id === id);
};

const addBookmark = function (item) {
  this.bookmarks.push(item);
};

const findAndDeleteBookmark = function (id) {
  this.bookmarks = this.bookmarks.filter(currentItem => currentItem.id !== id);
};

const editThisBookmark = function (id, data) {
  const bookmark = this.findById(id);
  Object.assign(bookmark, data);
};

const expandBookmarkView = function (id) {
  const bookmark = this.findById(id);
  bookmark.expanded = !bookmark.expanded;
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
  expanded,
  filter,
  findById,
  addBookmark,
  expandBookmarkView,
  findAndDeleteBookmark,
  editThisBookmark,
  setError,
  getError,
};