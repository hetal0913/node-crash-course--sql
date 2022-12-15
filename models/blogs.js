const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BLOGS', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    created_by_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    body: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    is_main_blog: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'blogs',
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
        name: "created_by_id",
        using: "BTREE",
        fields: [
          { name: "created_by_id" },
        ]
      },
    ]
  });
};
