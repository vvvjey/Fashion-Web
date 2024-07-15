'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasOne(models.Cart, { foreignKey: "userId",sourceKey: "id"})
      User.hasMany(models.Chat, { foreignKey: "receiverId", sourceKey: "id", as: "ReceivedChats" });
      User.hasMany(models.Chat, { foreignKey: "senderId", sourceKey: "id", as: "SentChats" });


    }
  }
  User.init({
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    address: DataTypes.STRING,
    password: DataTypes.STRING,
    refreshToken: DataTypes.STRING,
    role:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};