const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const Address =  sequelize.define('ADDRESSES', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    city: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    address1: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0
    },
    address_type: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'addresses',
    timestamps: true,
    //paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "user_id",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });

  return Address;
};
