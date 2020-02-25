// import $ from 'jquery';
import store from './store.js';
import api from './api.js';

const render = function () {
  const html = generateBooklistString(store.bookmarks);
  $('#bookmarks-display').html(html);
};

const generateBookmarkElement = function (bookmark) {
  return `
    <li class="bookmark-item" data-item-id="${bookmark.id}">
      <h2>${bookmark.title}</h2>
      <p class="book-rating">${bookmark.rating} ✩ out of 5</p>
      <div class="shopping-item-controls">
        <button class="bookmark-delete">
          <span class="button-label">Delete</span>
        </button>
        <button class="bookmark-update">
          <span class="button-label">Update</span>
        </button>
      </div>
    </li>`;
};

const getBookmarkIdFromElement = function (bookmark) {
  return $(bookmark)
    .closest('.bookmark-item')
    .data('item-id');
};

const addNewBookmark = function() {
  $('#bookmark-form').on('submit', e => {
    e.preventDefault();
    const rating = e.target.rating.value;
    const title = e.target.title.value;
    const url = e.target.url.value;
    const bookmark = {title, url, rating};
    api.createBookmark(bookmark)
      // .then(res => res.json())
      .then(data => {
        store.addBookmark(data);
        render();
      });     
  })
}

const deleteBookmarkClicked = function() {
  $('#bookmarks-display').on('click', '.bookmark-delete', event => {
    
    const id = getBookmarkIdFromElement(event.currentTarget);
    console.log(id);
    api.deleteBookmark(id)
      .then( () => {
        store.findAndDeleteBookmark(id);
        render();
      });
  });
};

const generateBooklistString = function (bookmarkList) {
  const bookmarks = bookmarkList.map((book) => generateBookmarkElement(book));
  return bookmarks.join('');

}

const bindEventListeners = function () {
  addNewBookmark();
  deleteBookmarkClicked();
}

export default {
  render,
  bindEventListeners,
  deleteBookmarkClicked,
  generateBookmarkElement,
  generateBooklistString
}