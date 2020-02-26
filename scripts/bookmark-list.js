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
        <button class="bookmark-expanded-view">
          <span class="button-label">Expand</span>
        </button>
        <button class="bookmark-update">
          <span class="button-label">Update</span>
        </button>
      </div>
    </li>`;
};

const expandedBookmarkView = function(bookmark) {
  return `
  <li class="bookmark-item" data-item-id="${bookmark.id}">
    <h2>${bookmark.title}</h2>
    <p class="book-rating">${bookmark.rating} ✩ out of 5</p>
    <p class="bookmark-url">Visit <a href="${bookmark.url}">${bookmark.url}</a></p>
    <p id="description" >${bookmark.description}</p>
    <div class="shopping-item-controls">
      <button class="bookmark-close">
        <span class="button-label">Close</span>
      </button>
    </div>
  </li>`;
};


const generateUpdatedBookmark = function (bookmark) {
  return `
    <li class="bookmark-item" data-item-id="${bookmark.id}">
      <label for="title">Name:</label>
      <input type="text" name="title" value="${bookmark.title}"/><br>
      <label class="book-rating">✩ out of 5</label>
      <select name="rating" id="book-rate" value="${bookmark.rating}">
            <option value="">--Filter By Rating--</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
      </select><br>
      <label for="url">Website:</label>
      <input type="text" name="url" value="${bookmark.url}"/><br>
      <label for="description">Description:</label>
      <textarea id="description" value="${bookmark.description}">Please add a brief description about this bookmark</textarea><br>
      <div class="shopping-item-controls">
        <button class="bookmark-cancel">
          <span class="button-label">Cancel</span>
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

const expandView = function () {
  $('#bookmarks-display').on('click', '.bookmark-expanded-view', event => {
    const id = getBookmarkIdFromElement(event.currentTarget);
    store.expandBookmarkView(id);
    render();
  });
};

const addNewBookmark = function() {
  $('#bookmark-form').on('submit', e => {
    e.preventDefault();
    const rating = e.target.rating.value;
    const title = e.target.title.value;
    const url = e.target.url.value;
    const describe = e.target.desc.value;
    const bookmark = {title, url, rating, describe} ;
    api.createBookmark(bookmark)
      // .then(res => res.json())
      .then(data => {
        store.addBookmark(data);
        render();
      });
    rating.val('');
    title.val('');
    url.val('');
    describe.val('');     
  })
}

const deleteBookmarkClicked = function() {
  $('#bookmarks-display').on('click', '.bookmark-delete', event => {
    const id = getBookmarkIdFromElement(event.currentTarget);
    api.deleteBookmark(id)
      .then( () => {
        store.findAndDeleteBookmark(id);
        render();
      });
  });
};

const updateCurrentBookmark = function() {
  $('#bookmarks-display').on('click', '.bookmark-update', event => {
    const id = getBookmarkIdFromElement(event.currentTarget);
    store.updateBookmark(id);
    render();
  });
    
};

const generateBooklistString = function (bookmarkList) {
  const bookmarks = bookmarkList.map((book) => {
    if(book.expanded) {
      return expandedBookmarkView(book);
    }
    else if(book.update) {
      return generateUpdatedBookmark(book);
    }
    else {
      return generateBookmarkElement(book);
    }});
  return bookmarks.join('');

}

const bindEventListeners = function () {
  addNewBookmark();
  deleteBookmarkClicked();
  updateCurrentBookmark();
  expandView();
}

export default {
  render,
  bindEventListeners,
  generateBookmarkElement,
  generateBooklistString
}