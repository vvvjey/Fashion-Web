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
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};