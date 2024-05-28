'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order_detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Order_detail.belongsTo(models.Order,{foreignKey:"orderId",targetKey:"orderId"})
      Order_detail.hasMany(models.Product_detail, { foreignKey: "productDetailId" ,sourceKey:"productDetailId"}); // Changed foreign key
    }
  }
  Order_detail.init({
    orderDetailId: {
      type:DataTypes.INTEGER,
      primaryKey:true
    },
    orderId: DataTypes.INTEGER,
    productDetailId: DataTypes.INTEGER,
    quantity:DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Order_detail',
  });
  return Order_detail;
};