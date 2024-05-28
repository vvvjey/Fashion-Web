'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Comment.belongsTo(models.Order,{foreignKey:"orderId",targetKey:"orderId"})
    }
  }
  Comment.init({
    commentId: {
      type:DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true
    },
    orderId: DataTypes.INTEGER,
    description:DataTypes.STRING,
    starRate:DataTypes.INTEGER,
    }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};