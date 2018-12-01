module.exports = function(scrape) {
var scrapeIt = require("scrape-it")

scrapeIt("https://www.ebay.com/sch/i.html?_from=R40&_nkw=2018+macbook&_sacat=0&_ipg=200", {
    price: "span.s-item__price"
    
  }).then(({ data, response }) => {
      console.log(`Status Code: ${response.statusCode}`)
      console.log(data)
  })
}