'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product_detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product_detail.belongsTo(models.Product,{foreignKey:"productId",targetKey:"productId"})
      Product_detail.belongsTo(models.Cart_detail, { foreignKey: "productDetailId", targetKey: "productDetailId" });
      Product_detail.belongsTo(models.Order_detail, { foreignKey: "productDetailId" }); // Changed foreign key
    }
  }
  Product_detail.init({
    productId: {
      type:DataTypes.INTEGER,
    },
    productDetailId: {
      primaryKey:true,
      type:DataTypes.INTEGER,
      autoIncrement:true
    },
    img: DataTypes.STRING,
    size: {
      type:DataTypes.STRING,
    },
    color: {
      type:DataTypes.STRING,
    },
    stock:DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Product_detail',
  });
  return Product_detail;
};