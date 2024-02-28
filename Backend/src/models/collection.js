'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Collection extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {


    }
  }
  Collection.init({
    collectionId: {
      type:DataTypes.INTEGER,
      primaryKey:true
    },
    name: DataTypes.STRING,
    img: DataTypes.STRING,
    intro: DataTypes.STRING,
    description: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Collection',
  });
  return Collection;
};