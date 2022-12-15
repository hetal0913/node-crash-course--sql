const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('AUTH_TOKENS', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    auth_token: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    device_token: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'auth_tokens',
    timestamps: true,
    //paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    indexes: [
      {
        name: "user_id",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
};
