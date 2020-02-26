import store from './store.js';
import api from './api.js';

const render = function () {
  var rating = $('#book-rate').val();
  rating = (rating === '' || rating === undefined) ? 0 : rating;
  console.log(rating);
  const bookmark = store.bookmarks.filter(item => item.rating >= rating);
  // const filteredBookmark = generateBooklistString(bookmark);
  const html = generateBooklistString(bookmark);
  if(store.adding === false) {
    $('#starter').html(generateInitialPage()).append(html);
  }
  else if(store.adding === true) {
    $('#starter').html(generateNewBookmark()).append(html);
  }
 
};

const generateInitialPage = function() {
  return `<div class="container">
    <h1>Bookmark List</h1>
    <form id="bookmark-form">
        <button type="submit" class="bookmark-add-button">Add New Bookmark</button>
        <select name="rating" id="book-rate">
            <option value="">--Filter By Rating--</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
        </select><br>
    </form>

    <ul id="bookmarks-display"></ul>
    </div>`;
};

const generateNewBookmark = function() {
  return `<div class="container">
    <h1>Bookmark List</h1>
    <form id="bookmark-form">
        <label for="title">Name: </label>
        <input type="text" name="title" id="title" placeholder="Title here" required/><br>
        <label for="url">Website: </label>
        <input type="text" name="url" id ="url" placeholder="Ex., http or https" required/><br>
        <label for="desc">Description:</label>
        <input type="text" name="desc" id="desc" placeholder="Add a brief description here"/><br>
        <label for="rating">Rating: </label>
        <select name="rating" id="book-new-rating">
            <option value="">--Give A Rating--</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
        </select><br>
        <button type="submit" class="button">Add New Bookmark</button>
    </form>

    <ul id="bookmarks-display"></ul>
    </div>`;
}

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
    <p id="description" >${bookmark.desc}</p>
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
      <input type="text" id="name" name="title" value="${bookmark.title}"/><br>
      <label class="book-rating">✩ out of 5</label>
      <select name="rating" id="book-rating" value="${bookmark.rating}">
            <option value="">--Filter By Rating--</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
      </select><br>
      <label for="url">Website:</label>
      <input type="text" id="url" name="url" value="${bookmark.url}"/><br>
      <label for="description">Description:</label>
      <textarea id="description" value="${bookmark.desc}" placeholder="Please add a brief description" ></textarea><br>
      <div class="shopping-item-controls">
        <button class="bookmark-cancel">
          <span class="button-label">Cancel</span>
        </button>
        <button class="bookmark-edit">
          <span class="button-label">Edit</span>
        </button>
      </div>
    </li>`;
};

const getBookmarkIdFromElement = function (bookmark) {
  return $(bookmark)
    .closest('.bookmark-item')
    .data('item-id');
};

const addBookmarkStart = function () {
  $('#starter').on('click', '.bookmark-add-button', event => {
    event.preventDefault();
    store.adding = true;
    render();
  });
};

const expandView = function () {
  $('#starter').on('click', '.bookmark-expanded-view', event => {
    const id = getBookmarkIdFromElement(event.currentTarget);
    store.expandBookmarkView(id);
    render();
  });
  store.expanded = false;
};

const closeBookmark = function () {
  $('#starter').on('click', '.bookmark-close', event => {
    event.preventDefault();
    const id = getBookmarkIdFromElement(event.currentTarget);
    store.expandBookmarkView(id);
    store.expanded = false;
    render();
  });
};

const addNewBookmark = function() {
  $('#starter').on('submit', e => {
    e.preventDefault();
    const rating = e.target.rating.value;
    const title = e.target.title.value;
    const url = e.target.url.value;
    const desc = e.target.desc.value;
    const bookmark = {title, url, rating, desc};
    console.log(bookmark);
    api.createBookmark(bookmark)
      // .then(res => res.json())
      .then(data => {
        store.addBookmark(data);
        render();
      });
    store.adding = false;
  });
};

const deleteBookmarkClicked = function() {
  $('#starter').on('click', '.bookmark-delete', event => {
    console.log("Hello?");
    const id = getBookmarkIdFromElement(event.currentTarget);
    console.log(id);
    api.deleteBookmark(id)
      .then( () => {
        store.findAndDeleteBookmark(id);
        render();
      });
  });
};

const filterBookmarksByRating = function() {
  $('#starter').on('change', '#book-rate', event => {
    event.preventDefault();
    // let rating = $('#book-rate').val();
    // console.log(rating);
    // const bookmark = store.bookmarks.filter(item => item.rating >= rating);
    // console.log(bookmark);
    // let filteredBookmark = generateBooklistString(bookmark);
    // console.log(filteredBookmark);
    
    render();
  });
};

const updateCurrentBookmark = function() {
  $('#starter').on('click', '.bookmark-update', event => {
    const id = getBookmarkIdFromElement(event.currentTarget);
    store.updateBookmark(id);
    render();
  });
};

const editBookmark = function () {
  $('#starter').on('click', '.bookmark-edit', event => {
   
    const bookmark = 
    {
      'title': $('#name').val(),
      'rating': $('#book-rating').val(),
      'url': $('#url').val(),
      'desc': $('#description').val()
    };
    const id = getBookmarkIdFromElement(event.currentTarget);
    console.log(id);
    console.log(bookmark);
    api.updateBookmark(id, bookmark) 
      .then( () => {
        store.editThisBookmark(id, bookmark);
        render();
      });
    bookmark.update = false;
  });
};

const cancelBookmarkUpdate = function () {
  $('#starter').on('click', '.bookmark-cancel', event => {
    event.preventDefault();
    const id = getBookmarkIdFromElement(event.currentTarget);
    store.updateBookmark(id);
    store.update = false;
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

};

const bindEventListeners = function () {
  addNewBookmark();
  addBookmarkStart();
  deleteBookmarkClicked();
  updateCurrentBookmark();
  cancelBookmarkUpdate();
  filterBookmarksByRating();
  editBookmark();
  expandView();
  closeBookmark();
};

export default {
  render,
  bindEventListeners,
};