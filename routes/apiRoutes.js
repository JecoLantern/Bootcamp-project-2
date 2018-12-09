var db = require("../models");
const scrapeIt = require("scrape-it");

module.exports = function(app) {
  // Get all searches
  app.get("/api/searches", function(req, res) {
    db.Search.findAll({}).then(function(dbSearches) {
      res.json(dbSearches);
    });
  });

  // Create a new searches
  // app.post("/api/searches", function(req, res) {
  //   db.Search.create({
  //     search: req.body.search
  //   })
  //     .then(function(dbSearches) {
  //       res.json(dbSearches);
  //     })
  //     .catch(function(err) {
  //       res.json(err);
  //     });
  // });

  // Delete an example by id
  app.delete("/api/searches/:id", function(req, res) {
    db.Search.destroy({ where: { id: req.params.id } }).then(function(dbSearches) {
      res.json(dbSearches);
    });
  });

  // takes User input to run scraper to get price data
  app.post("/api/searches", function(req, res) {

    console.log(req.body.search)
    q = req.body.search

    for(var i = 0; i < q.length; i++) {
      q = q.replace(" ", "+");     
    }

    console.log(q);
    //scrape function
    scrapeIt(`https://www.ebay.com/sch/i.html?_from=R40&_nkw=${q}&_sacat=0&_ipg=200`, {
      price: "span.s-item__price"
      
    }).then(({ data, response }) => {
      var prices = [];
        console.log(`Status Code: ${response.statusCode}`)
        console.log(data)
        var updatedPrice = data.price

        var onePrice = updatedPrice.split('$')
      
        function priceChart (){
          
          for(var i = 1; i < 50; i++) {
            var finalPrice ={
              price: onePrice[i]
            };
            console.log(finalPrice);
            prices.push(finalPrice);
          }
         
          db.Search.bulkCreate({search: q}, prices).then(function(result){
            res.json(result);
          })
          .catch(function(err){
            res.json(err);
          });
        }
      
      priceChart()
      });

      // db.Search.create({
      //   search: q
      // })
      //   .then(function(dbSearches) {
      //     res.json(dbSearches);
      //   })
      //   .catch(function(err) {
      //     res.json(err);
      //   });
  })

};
