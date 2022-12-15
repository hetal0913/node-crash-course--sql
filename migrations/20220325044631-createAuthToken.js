'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.createTable('auth_tokens', { 
       id: {
         type: Sequelize.INTEGER,
         primaryKey: true,
         autoIncrement: true
       },
       user_id: {
          type: Sequelize.INTEGER,
          references: {
            model: "users",
            key: "id"
          }
       },
       auth_token: {
         type: Sequelize.STRING,
         allowNull: false
       },
       device_token: {
         type: Sequelize.STRING,
         allowNull: false
       },
       is_deleted: {
         type: Sequelize.BOOLEAN,
         defaultValue: false
       },
       deleted_at: Sequelize.DATE,
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

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     await queryInterface.dropTable('auth_tokens');
  }
};
