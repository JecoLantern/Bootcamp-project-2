var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Search.findAll({}).then(function(dbSearches) {
      res.render("index", {
        msg: "Welcome!",
        search: dbSearches
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/searchInfo/:id", function(req, res) {
    db.Search.findOne({ where: { id: req.params.id } }).then(function(dbSearches) {
      res.render("search", {
        search: dbSearches
      });
    });
  });

  app.get("/search", function(req, res) {
    res.render("search");
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
