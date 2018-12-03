
//Ebay
var scrapeIt = require("scrape-it")
$('#submit').on('click',function (event){
    event.preventDefault();
var userInput = $('#search').val().trim()
 scrapeIt("https://www.ebay.com/sch/i.html?_from=R40&_nkw=" + userInput + "&_sacat=0&_ipg=200", {
     price: "span.s-item__price"
    
   }).then(({ data, response }) => {
       console.log(`Status Code: ${response.statusCode}`)
       console.log(data)
   })

// Wal-Mart
 scrapeIt("https://www.walmart.com/search/?query=" + userInput, {
     price: ".search-result-productprice"
    
   }).then(({ data, response }) => {
       console.log(`Status Code: ${response.statusCode}`)
       console.log(data)
   })
};
  


