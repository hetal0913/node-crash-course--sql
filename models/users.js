const Sequelize = require("sequelize");
const Op = require("sequelize").Op;
const {addDefaultAddress} = require('../functions/address');
const APIError = require('../utils/APIError')

module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define(
    "USERS",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      first_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          len: {
            args: [5, 50],
            msg: 'The name must contain between 5 and 50 characters.' // Error message I want to display
          },
          isAlpha: true
        }
      },
      last_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      mobile_no: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      is_deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: 0,
      },
      user_type: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          isIn: {
            args: [['Patient', 'Doctor']],
            msg: "Must be abc or xyz"
          }
        }
      },
    },
    {
      scopes: {
        deleted: {
          where: {
            is_deleted: false
          }
        },
        filterByName: function (value) {
          console.log(value)
          if (typeof value !== 'undefined' && value){
            console.log('if')
            return {
              where: {
                last_name: { [Op.like]: `%${value}%` }
              }
            }
          } else {
            console.log('else')
            return {}
          }
        }
      },
      sequelize,
      tableName: "users",
      timestamps: true,
      //paranoid: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
      ],
    }
  );

  User.afterCreate(async (user, options) => {
    // console.log("testing hooks");
    // const address = await addDefaultAddress(user.id, sequelize.models, options);
    // console.log('after create function')
    // console.log(address)
   });

   User.beforeCreate(async (user, options) => {
     var params = user.dataValues
    //  console.log ("before create" + params.first_name)
     let userExist = await sequelize.models.USERS.findOne({where: {first_name: params.first_name}});
     if (userExist) throw new APIError({status: 400, message: 'User name already exist'});      
    //  console.log ("end function")
   })

  return User
};
