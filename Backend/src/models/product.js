'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.hasMany(models.Product_detail,{foreignKey:"productId"})
    }
  }
  Product.init({
    productId: {
      type:DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true
    },
    name: DataTypes.STRING,
    categoryId: DataTypes.STRING,
    collectionId: DataTypes.STRING,
    price:DataTypes.INTEGER,
    description:DataTypes.STRING,
    salePercent:DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};