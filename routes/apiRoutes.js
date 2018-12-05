var db = require("../models");

module.exports = function(app) {
  // Get all searches
  app.get("/api/searches", function(req, res) {
    db.Search.findAll({}).then(function(dbSearches) {
      res.json(dbSearches);
    });
  });

  // Create a new searches
  app.post("/api/searches", function(req, res) {
    db.Search.create({
      search: req.body.search
    })
      .then(function(dbSearches) {
        res.json(dbSearches);
      })
      .catch(function(err) {
        res.json(err);
      });
  });

  // Delete an example by id
  app.delete("/api/searches/:id", function(req, res) {
    db.Search.destroy({ where: { id: req.params.id } }).then(function(dbSearches) {
      res.json(dbSearches);
    });
  });
};
