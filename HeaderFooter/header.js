document.write('\
\
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">\
        <a class="navbar-brand" href="/index.html">Home</a>\
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">\
          <span class="navbar-toggler-icon"></span>\
        </button>\
      \
        <div class="collapse navbar-collapse" id="navbarSupportedContent">\
          <ul class="navbar-nav mr-auto">\
            <li class="nav-item active" id="favoritesPage">\
              <a class="nav-link" href="/Favorite/favorite.html">Favorites<span class="sr-only">(current)</span></a>\
            </li>\
            <li class="nav-item active">\
              <a class="nav-link" href="/About/about.html">About Us<span class="sr-only">(current)</span></a>\
            </li>\
          </ul>\
          <div class="form-inline my-2 my-lg-0">\
            <input class="form-control mr-sm-2" type="search" id="searchbox" placeholder="Search For Congress" aria-label="Search">\
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit" id="searchSubmit">Search</button>\
          </div>\
          <ul class = "navbar-nav">\
            <li class="nav-item" id="isLoggedIn">\
                <a class="nav-link" href="/LoginRegister/login.html">Log In</a>\
            </li>\
          </ul>\
        </div>\
      </nav>\
\
');