require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
var scrapeIt =require("scrape-It");

var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");


app.get('/search', (req, res) => {  
  res.render('search');
  queries = req.query;
 var url = scrapeIt("https://www.ebay.com/sch/i.html?_from=R40&_nkw="+ queries +"&_sacat=0&_ipg=200")
 if (queries){
      (url, {
  params: queries
})({
  price: "span.s-item__price"
   
  }).then(({ data, response }) => {
      console.log(`Status Code: ${response.statusCode}`)
      console.log(data)
      console.log("ebay");
  })}
});
 

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;