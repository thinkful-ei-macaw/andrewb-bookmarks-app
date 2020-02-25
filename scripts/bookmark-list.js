// import $ from 'jquery';
import store from './store.js';
import api from './api.js';

const render = function () {
  const html = this.generateBooklistString(store.bookmarks);
  $('#bookmarks-display').html(html);
};

const generateBookmarkElement = function (bookmark) {
  return `
    <li class="js-item-element" id="${bookmark.id}">
      <h2>${bookmark.title}</h2>
      <span class="book-rating">${bookmark.rating} out of 5</span>
      <div class="shopping-item-controls">
        <button class="bookmark-delete">
          <span class="button-label">Delete</span>
        </button>
      </div>
    </li>`;
};

const getBookmarkIdFromElement = function (bookmark) {
  return $(bookmark)
    .closest('.js-item-element')
    .attr('id');
};

$('getBookmarkIdFromElement');

const bindEventListeners = function() {
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
        this.render();
      });     
  })
}

const deleteBookmarkClicked = function() {
  $('#bookmarks-form').on('click', '.bookmark-delete', event => {
    
    const id = getBookmarkIdFromElement(event.currentTarget);
    
    api.deleteBookmark(id)
      .then( () => {
        store.findAndDeleteBookmark(id);
        this.render();
      });
  });
};

const generateBooklistString = function (bookmarkList) {
  const bookmarks = bookmarkList.map((book) => generateBookmarkElement(book));
  return bookmarks.join('');

}

export default {
  render,
  bindEventListeners,
  deleteBookmarkClicked,
  generateBookmarkElement,
  generateBooklistString
}