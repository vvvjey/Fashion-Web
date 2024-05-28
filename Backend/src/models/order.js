'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Order.hasMany(models.Order_detail,{foreignKey:"orderId"})
      Order.hasMany(models.Comment,{foreignKey:"orderId"})

    }
  }
  Order.init({
    orderId: {
      type:DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true
    },
    userId: DataTypes.INTEGER,
    total: DataTypes.INTEGER,
    state:DataTypes.STRING,
    addressShipping:DataTypes.STRING,
    isRate:DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};