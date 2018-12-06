var db = require("../models");

module.exports = function(app , scrape) {
  // Load index page
  app.get("/", function(req, res) {
    db.Search.findAll({}).then(function(dbExamples) {
      res.render("index", {
        
      });
    });
  
  app.get("/POST?", function(req, res) {
      res.render("graph", {
        
      });
    });
  

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Search.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
      res.render("example", {
        example: dbExample
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
})
};
