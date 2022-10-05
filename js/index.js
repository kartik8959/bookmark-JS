document.getElementById("myform").addEventListener("submit", saveBookmark);

function saveBookmark(e) {
  // get form values
  e.preventDefault();
  let siteName = document.querySelector("#site-name").value;
  let siteUrl = document.querySelector("#site-url").value;

  if (validateForm(siteName, siteUrl)) {
    // check if bookmark value is null
    if (localStorage.getItem("bookmarks") === null) {
      let bookmarks = [];
      bookmarks.push(bookmark);
      localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    } else {
      let bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
      bookmarks.push(bookmark);
      localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    }
  }

  let bookmark = {
    name: siteName,
    url: siteUrl,
  };

  // clear form
  document.getElementById("myform").reset();

  //Refech the locastorage data
  fetchBookmarks();
}

function deleteBookmark(siteUrl) {
  let bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  for (let i = 0; i < bookmarks.length; i++) {
    if (bookmarks[i].url === siteUrl) {
      bookmarks.splice(i, 1);
    }
  }

  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  fetchBookmarks();
  console.log("delete");
}

function fetchBookmarks() {
  let bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  let bookmarkResult = document.getElementById("bookmarkresult");
  bookmarkResult.innerHTML = "";

  for (let i = 0; i < bookmarks.length; i++) {
    let name = bookmarks[i].name;
    let url = bookmarks[i].url;

    bookmarkResult.innerHTML += `
    <div class="card p-0 mb-2 ">
  <div class="card-body ">
  ${name} 
  <a class="btn btn-sm btn-link" target="_blank" href="${url}">Visit</a>
  <a onclick="deleteBookmark('${url}')" class="btn btn-sm btn-danger" href="#">Delete</a> 
  </div>
</div>
`;
  }
}

function validateForm(siteName, siteUrl) {
  if (!siteName || !siteUrl) {
    alert("Please fill the form");
    return false;
  }

  let expression =
    /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
  let regex = new RegExp(expression);

  if (!siteUrl.match(regex)) {
    alert("Please use a valid Url");
    return false;
  }
  return true;
}
