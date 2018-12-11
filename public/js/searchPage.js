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
    }), $.post('/api/searches', search, (data) => {console.log(data)}); 
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
    function formatMoney(n, c, d, t) {
      var c = isNaN(c = Math.abs(c)) ? 2 : c,
        d = d == undefined ? "." : d,
        t = t == undefined ? "," : t,
        s = n < 0 ? "-" : "",
        i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
        j = (j = i.length) > 3 ? j % 3 : 0;
    
      return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
    };
    var $searches = data.map(function(search) {
      var $trtd = $(
        "<tr class='animated flipInX delay-1s fast' data-id='" +
          search.id +
          "'><td class='list-group-item'>" +
          search.search +
          "</td><td>$" +
          formatMoney(search.price) +
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
refreshSearches();

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