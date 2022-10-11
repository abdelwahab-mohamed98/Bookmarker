var siteNameInput = document.getElementById("siteNameInput");
var siteLinkInput = document.getElementById("siteLinkInput");
var currenIndex = 0;
var bookmarksContainer = [];

if (localStorage.getItem("bookmarks") =! null){
  bookmarksContainer = JSON.parse(localStorage.getItem("bookmarks"));
  displayBookmark();
}


  function addBookmark(){
    if(validateBookmarkLink () == true){
    if(submitBtn.innerHTML == "Add Bookmark"){
      bookmark = {
        name:siteNameInput.value,
        link:siteLinkInput.value,
      }
      bookmarksContainer.push(bookmark);
      displayBookmark();
      localStorage.setItem("bookmarks",JSON.stringify(bookmarksContainer));
      clearInput()
    }
    else {
      updateBookmark();
    }  
    }
    else {
      alert("Insert Valid Site Link")
    }
    };


function displayBookmark(){
  var bookmarkRow = "";
  for(var i = 0; i<bookmarksContainer.length; i++) {
    bookmarkRow += `
    <tr>
      <td class="py-4">${i+1}</td>
      <td class="py-4">${bookmarksContainer[i].name}</td>
      <td class="py-4"><a href="${bookmarksContainer[i].link}" target="_blank" class="btn btn-outline-primary">Visit</a></td>
      <td class="py-4"><button class="btn btn-primary" onclick="getBookmarkData(${i})">Edit</button></td>
      <td class="py-4"><button class="btn btn-danger" onclick="deleteBookmark(${i})">Delete</button></td>
    </tr>
    `
  }
  document.getElementById("tableBody").innerHTML = bookmarkRow;
}

function clearInput() {
  siteNameInput.value = "";
  siteLinkInput.value = "";
}

function deleteBookmark(index) {
  bookmarksContainer.splice(index, 1);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarksContainer));
  displayBookmark();
}

function searchBookmark(item) {
  var bookmarkRow = "";
  for(var i = 0; i<bookmarksContainer.length; i++) {
    if(bookmarksContainer[i].name.toLowerCase().includes(item.toLowerCase()) == true) {
      bookmarkRow += `
      <tr>
        <td class="py-4">${i+1}</td>
        <td class="py-4">${bookmarksContainer[i].name}</td>
        <td class="py-4"><a href="${bookmarksContainer[i].link}" target="_blank" class="btn btn-outline-primary">Visit</a></td>
        <td class="py-4"><button class="btn btn-primary" onclick="getBookmarkData(${i})">Edit</button></td>
        <td class="py-4"><button class="btn btn-danger" onclick="deleteBookmark(${i})">Delete</button></td>
      </tr>
      `  
    }
  }
  document.getElementById("tableBody").innerHTML = bookmarkRow;
}

function getBookmarkData(item) {
  currenIndex = item;
  siteNameInput.value = bookmarksContainer[item].name;
  siteLinkInput.value = bookmarksContainer[item].link;
  submitBtn.innerHTML = "Update Bookmark";
}

function updateBookmark() {
  var bookmark = {
    name:siteNameInput.value,
    link:siteLinkInput.value,
  }
  bookmarksContainer[currenIndex] = bookmark;
  localStorage.setItem("bookmarks", JSON.stringify(bookmarksContainer));
  clearInput();
  displayBookmark();
  submitBtn.innerHTML = "Add Bookmark"; 
}

function validateBookmarkLink () {
  var regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
  if(regex.test(siteLinkInput.value) == true) {
    return true;
  }
  else {
    return false;
  }
}