"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable("blogs", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      created_by_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      body: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      is_main_blog: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
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
    await queryInterface.dropTable("blogs");
  },
};
