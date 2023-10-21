'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return await queryInterface.createTable('sales', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      clothe_price: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'clothes',
          key: 'price',
        },
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
      },
      clothe_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'clothes',
          key: 'id',
        },
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  async down(queryInterface) {
    return await queryInterface.dropTable('sales');
  },
};
