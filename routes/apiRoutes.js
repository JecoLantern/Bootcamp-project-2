var db = require("../models");
const scrapeIt = require("scrape-it")
module.exports = function(app) {
  // Get all examples
  app.get("/api/searches", function(req, res) {
    db.Search.findAll({}).then(function(dbSearches) {
      res.json(dbSearches);
    });
  });

  // takes User input to run scraper to get price data
  app.post("/api/searches", function(req, res) {
    console.log(req.body.search)
    q = req.body.search
    //scrape function
    scrapeIt(`https://www.ebay.com/sch/i.html?_from=R40&_nkw=${q}&_sacat=0&_ipg=200`, {
      price: "span.s-item__price"
      
    }).then(({ data, response }) => {
        console.log(`Status Code: ${response.statusCode}`)
        console.log(data)


        // var priceDataByDollar = data.split(" ");
        // console.log(priceDataByDollar)

        // db.Search.create(data).then(function(dbExample) {
   
        //   res.json(dbExample);
        // });
        
          });
  
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Search.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });
};
