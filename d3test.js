'use strict';
var express = require("express");
var exphbs = require("express-handlebars");
var app = express();

var populationRouter = require('./routes/d3');

var PORT = process.env.PORT || 5000;


//used by express first
app.use(express.static('./public'));
app.use(express.static('./routes'));



//templating engine

app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

app.use('/price', populationRouter.getPopulations());

app.get('/', function (req, res) {
    res.render('searchinfo', {
        title: 'Population Chart'
    });
});

app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });