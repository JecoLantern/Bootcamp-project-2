// Get references to page elements
var searchItem = $("#searchItem");
var $submitBtn = $("#submit");
var $searchList = $("#search-list");

// The API object contains methods for each kind of request we'll make
var API = {
  saveSearch: function(search) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/searches",
      data: JSON.stringify(search)
    });
  },
  getSearches: function() {
    return $.ajax({
      url: "api/searches",
      type: "GET"
    });
  },
  deleteSearch: function(id) {
    return $.ajax({
      url: "api/searches/" + id,
      type: "DELETE"
    });
  }
};

// refreshSearches gets new searches from the db and repopulates the list
var refreshSearches = function() {
  API.getSearches().then(function(data) {
    var $searches = data.map(function(search) {
      var $trtd = $(
        "<tr data-id='" +
          search.id +
          "'><td class='list-group-item'>" +
          search.search +
          "</td><td>" +
          "Insert Price" +
          "</td><td><a href=" +
          "'/searchInfo/" +
          search.id +
          "'>" +
          "Click for More Info" +
          "</a>" +
          "</td><td data-id='" +
          search.id +
          "'><button class='btn delete'>" +
          "ｘ" +
          "</button></td></tr>"
      );

      return $trtd;
    });

    $searchList.empty();
    $searchList.append($searches);
  });
};

// handleFormSubmit is called whenever we submit a new search
// Save the new search to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var search = {
    search: searchItem.val().trim()
    // price: Scrape
  };

  if (!search.search) {
    alert("You must enter a search item!");
    return;
  }

  API.saveSearch(search).then(function() {
    refreshSearches();
  });

  searchItem.val("");
};

// handleDeleteBtnClick is called when an search's delete button is clicked
// Remove the search from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteSearch(idToDelete).then(function() {
    refreshSearches();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$searchList.on("click", ".delete", handleDeleteBtnClick);
