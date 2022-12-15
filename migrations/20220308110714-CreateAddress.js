"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable("addresses", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      city: { 
        type: Sequelize.STRING,
        allowNull: true
       },
      address1: { 
        type: Sequelize.STRING 
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
      is_deleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      deleted_at: {
        type: Sequelize.DATE,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable("addresses");
  },
};
