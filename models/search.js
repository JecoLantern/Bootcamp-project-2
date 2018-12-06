module.exports = function(sequelize, DataTypes) {
  var Search = sequelize.define("Search", {
    search: DataTypes.STRING,
    price: DataTypes.STRING
    // description: DataTypes.TEXT
  });
  return Search;
};
