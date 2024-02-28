'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart_detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Cart_detail.belongsTo(models.Cart,{foreignKey:"cartId",targetKey:"cartId"})
      Cart_detail.hasOne(models.Product_detail, { foreignKey: "productDetailId", sourceKey: "productDetailId" });
    }
  }
  Cart_detail.init({
    cartDetailId: {
      type:DataTypes.INTEGER,
      primaryKey:true
    },
    cartId: DataTypes.INTEGER,
    productDetailId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Cart_detail',
  });
  return Cart_detail;
};