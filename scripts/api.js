
const BASE_URL = 'https://thinkful-list-api.herokuapp.com/andrewb';

function getBookmark() {
  return fetchListApi(`${BASE_URL}/bookmarks`);
}
  
function createBookmark(bookmark) {
  const newItem = JSON.stringify(bookmark);
    
  return fetchListApi(`${BASE_URL}/bookmarks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: newItem,
  });
}
  
function deleteBookmark(id) {
  return fetchListApi(`${BASE_URL}/bookmarks/${id}`, {
    method: 'DELETE'
  });
  
}
  
function updateBookmark(id, updateData) {
  return fetchListApi(`${BASE_URL}/bookmarks/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify(updateData),
  });
}
  
function fetchListApi(...args) {
  let error;
  return fetch(...args)
    .then(res => {
      if(!res.ok) {
        error = { code: res.status };
      }
      if (!res.headers.get('content-type').includes('json')) {
        error.message = res.statusText;
        return Promise.reject(error);
      }
      return res.json();
    })
    .then(data => {
      if(error) {
        error.message = data.message;
        return Promise.reject(error);
      }
      return data;
    });
  
}
  
export default {
  getBookmark,
  createBookmark,
  updateBookmark,
  deleteBookmark
};