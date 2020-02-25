// import $ from 'jquery';
import api from './api.js';
import store from './store.js';

// import './index.css';

import bookmarkList from './bookmark-list.js';

const main = function () {
  api.getBookmark()
    .then((bookmark) => {
      bookmark.forEach((book) => store.addBookmark(book));
      bookmarkList.render();
    });
  
  bookmarkList.bindEventListeners();
  bookmarkList.render();
};
  
$(main);

