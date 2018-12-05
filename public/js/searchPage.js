// Get references to page elements
var searchItem = $("#searchItem");
var $submitBtn = $("#submit");
var $searchList = $("#search-list");

// var Scrape = require("./scrape.js")

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

// refreshExamples gets new searches from the db and repopulates the list
var refreshSearches = function() {
  API.getSearches().then(function(data) {
    var $searches = data.map(function(search) {
      // var $a = $("<a>")
      //   .attr("href", "/searchInfo/" + search.id)
      //   .text(search.search);

      // var $button = $("<button>")
      //     .addClass("btn delete")
      //     .text("ｘ");
      // var $trOpen = $("<tr>");
      // var $trClose = $("</tr>");
      var $td = $("<tr data-id='" + search.id + "'><td class='list-group-item'>" + search.search + "</td><td>" + "Insert Price" + "</td><td><a href=" + "'/searchInfo/" + search.id + "'>" + search.search + "</a>" + "</td><td><button class='btn delete'>" + "ｘ" + "</button></td></tr>");
      // var $tdClose = $("</td>");

      // $td.attr({ class: "list-group-item", "data-id": search.id }).append($a);
      // $td.attr({ class: "list-group-item", "data-id": search.id });
      // $td.text(search.search).append($tdClose);

      // $td.text("Price");
      // $td.append($a).append($tdClose);


      // $td.append($button);
      // $td;
      return $td;
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
    // description: $exampleDescription.val().trim()
  };

  // if (!(example.text && example.description)) {
  //   alert("You must enter an example text and description!");
  //   return;
  // }

  API.saveSearch(search).then(function() {
    refreshSearches();
  });

  searchItem.val("");
  // $exampleDescription.val("");
};

// handleDeleteBtnClick is called when an search's delete button is clicked
// Remove the search from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $("<tr>")
    // .parent()
    .attr("data-id");

  API.deleteSearch(idToDelete).then(function() {
    refreshSearches();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$searchList.on("click", ".delete", handleDeleteBtnClick);
