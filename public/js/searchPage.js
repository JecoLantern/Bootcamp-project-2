// Get references to page elements
var searchItem = $("#searchItem");
// var $exampleDescription = $("#example-description");
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
      url: "api/examples",
      data: JSON.stringify(search)
    });
  },
  getSearch: function() {
    return $.ajax({
      url: "api/examples",
      type: "GET"
    });
  },
  deleteSearch: function(id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshSearch = function() {
  API.getSearch().then(function(data) {
    var $search = data.map(function(search) {
      var $a = $("<a>")
        .text(search.search)
        .attr("href", "/example/" + search.id);

      var $td = $("<td>");
      // $td.text("'" + search.searchItem + "'");
      // $td.text("Insert Price").append($td);
      // $td.text("Link to graph").append($td);
      $td.attr({ class: "list-group-item", "data-id": search.id }).append($a);

      var $button = $("<button>")
        .addClass("btn delete")
        .text("ｘ");

      $td.append($button);

      return $td;
    });

    $searchList.empty();
    $searchList.append($search);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var search = {
    search: searchItem.val().trim()
    // description: $exampleDescription.val().trim()
  };

  // if (!(example.text && example.description)) {
  //   alert("You must enter an example text and description!");
  //   return;
  // }

  API.saveSearch(search).then(function() {
    refreshSearch();
  });

  searchItem.val("");
  // $exampleDescription.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteSearch(idToDelete).then(function() {
    refreshSearch();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$searchList.on("click", ".delete", handleDeleteBtnClick);
