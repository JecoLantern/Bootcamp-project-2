module.exports = function(sequelize, DataTypes ) {
  var price = sequelize.define("Price", {
    price: DataTypes.DECIMAL(15,4),
   
  });
  return price;

};
