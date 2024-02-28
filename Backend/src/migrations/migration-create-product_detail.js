'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Product_details', {
      productDetailId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      productId: {
        type: Sequelize.INTEGER,

      },
      img: {
        type: Sequelize.STRING
      },
      size: {
        allowNull: false,
        type: Sequelize.STRING,

      },
      color: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      stock: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    },{
      uniqueKeys:{
        uniqueConstraint:{
          fields:['productId', 'color', 'size']
        }
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Product_details');
  }
};