'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Cart.hasMany(models.Cart_detail,{foreignKey:"cartId"})
      Cart.belongsTo(models.User, { foreignKey: "userId", targetKey: "id" })

    }
  }
  Cart.init({
    cartId: {
      type:DataTypes.INTEGER,
      primaryKey:true
    },
    userId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};