'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Chat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Chat.belongsTo(models.User, { foreignKey: "receiverId", targetKey: "id", as: "UserB" });
      Chat.belongsTo(models.User, { foreignKey: "senderId", targetKey: "id", as: "UserA" });
    }
  }
  Chat.init({
    chatId: {
      type:DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true
    },
    senderId: DataTypes.INTEGER,
    receiverId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Chat',
  });
  return Chat;
};