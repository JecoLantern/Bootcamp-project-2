module.exports = function(sequelize, DataTypes) {
  var price = sequelize.define("Price", {
    price: DataTypes.INTEGER,
   
  });
  return price;

};
