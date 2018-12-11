module.exports = function(sequelize, DataTypes) {
  var Search = sequelize.define("Search", {
    search: DataTypes.STRING,
    price: DataTypes.DECIMAL(15, 2)
  });
  // var price = sequelize.define("Price", {
  //   price: DataTypes.DECIMAL(15,4)
  // }); return price
  return Search;
};
