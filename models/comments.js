const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('COMMENTS', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    blog_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'blogs',
        key: 'id'
      }
    },
    comment: {
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
    tableName: 'comments',
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
        name: "blog_id",
        using: "BTREE",
        fields: [
          { name: "blog_id" },
        ]
      },
    ]
  });
};
