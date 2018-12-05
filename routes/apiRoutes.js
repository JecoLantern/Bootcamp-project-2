var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.Search.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

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
  app.delete("/api/examples/:id", function(req, res) {
    db.Search.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });
};