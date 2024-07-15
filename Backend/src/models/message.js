'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

    }
  }
  Message.init({
    messageId: {
      type:DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true
    },
    senderId: DataTypes.INTEGER,
    chatId: DataTypes.INTEGER,
    text:DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};