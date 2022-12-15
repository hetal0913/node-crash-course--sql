'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn(
      'users',
      'user_type',
      {
        type: Sequelize.STRING,
        allowNull: false,
      }
    )

    await queryInterface.addColumn(
      'addresses',
      'address_type',
      {
        type: Sequelize.STRING,
        allowNull: false
      }
    )
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('users', 'user_type')
    await queryInterface.removeColumn('addresses', 'address_type')
  }
};
