const { USERS, ADDRESSES } = require("../middleware/database");
const { getData } = require("../helper/userHelper");
const Parameters = require("strong-params").Parameters;
const { generateToken } = require('../functions/common');
const {
  userAttributes,
  excludeFields,           
  _active,
  _nonActive,
} = require("../helper/attributesHelper");
const { response } = require("express");
const APIError = require("../utils/APIError");
const Op = require("sequelize").Op;

// get all deleted users and return data helper function
exports.getAllDeletedUsers = async (req, res) => {
  // try {
    const first_name = req.query.first_name;
    const last_name = req.query.last_name;
    const _condition = first_name
      ? { first_name: { [Op.like]: `%${first_name}%` } }
      : null;
    const users = await USERS.scope('deleted', {method: ['filterByName', last_name]}).findAll({
      raw: true,
      attributes: {
        exclude: excludeFields(),
      },
      where: { ..._condition },
      order: [["first_name", "DESC"]],
    });

    if (users.length > 0) {
      res.sendJson(200, "User Data", users);
    } else {
      res.sendJson(400, "There are no users available to display");
    }
  // } catch (err) {
  //   res.sendJson(500, err.message || "something went wrong");
  // }
};

// get all users and return data helper function
exports.getAllUsers = (req, res) => {
  const first_name = req.query.first_name;
  const _condition = first_name
    ? { first_name: { [Op.like]: `%${first_name}%` } }
    : null;
  USERS.findAll({
    attributes: {
      exclude: excludeFields(),
    },
    where: { ..._condition, ..._active },
    order: [["first_name", "DESC"]],
  })
    .then(async (result) => {
      console.log(result);
      if (result.length > 0) {
        var data = [];
        for (const key in result) {
          if (Object.hasOwnProperty.call(result, key)) {
            const element = result[key];

            var getUser = await getData(element);
            data.push(getUser);
          }
        }
        res.sendJson(200, "User Data", data);
      } else {
        res.sendJson(400, "There are no users available to display");
      }
    })
    .catch((err) => {
      res.sendJson(500, err.message || "something went wrong");
    });
};

// get all data with join/include and return response receive in query execution without helper function
exports.getAllUsersWithJoin = async (req, res) => {
  try {
    const user = await USERS.findAll({
      attributes: {
        exclude: ["created_at", "updated_at"],
      },
      include: [
        {
          model: ADDRESSES,
          as: "addresses",
        },
      ],
      order: [["first_name", "DESC"]],
    });
    if (user.length > 0) {
      res.sendJson(200, "User Data", user);
    } else {
      res.sendJson(400, "There are no users available to display");
    }
  } catch (err) {
    res.sendJson(500, err.message || "something went wrong");
  }

  // using then will introduce callback hell
  // USERS.findAll({
  //   raw: true,
  //   attributes: {
  //     exclude: ["created_at", "updated_at"],
  //   },
  //   include: [
  //     {
  //       model: ADDRESSES,
  //       as: "addresses",
  //     },
  //   ],
  //   order: [["first_name", "DESC"]],
  // })
  //   .then(async (result) => {
  //     console.log(result);
  //     if (result.length > 0) {
  //       res.status(200).send({ message: "User Data", actualData: result });
  //     } else {
  //       res
  //         .status(400)
  //         .send({ message: "There are no users available to display" });
  //     }
  //   })
  //   .catch((err) => {
  //     res.status(500).send({ message: err.message || "something went wrong" });
  //   });
};

//get single user by id
exports.getUserById = (req, res) => {
  const id = req.params.id;
  USERS.findOne({
    attributes: userAttributes,
    where: { id: id },
    include: [
      {
        model: ADDRESSES,
        as: "addresses",
        attributes: ["id", "city"],
      },
    ],
  })
    .then(async (result) => {
      if (result) {
        var data = await getData(result);
        res.status(200).send({
          message: "User Data",
          data: data,
          actualData: result.dataValues,
        });
      } else {
        res.sendJson(400, "There are no users available to display");
      }
    })
    .catch((err) => {
      res.sendJson(500, err.message || "something went wrong");
    });
};

//create new user without permit params
exports.createUser = async (req, res, next) => {
  try {
    const deviceToken = req.headers['x-device-token'] || null
    if(!deviceToken) throw new APIError({status: 401, message: "Invalid or missing header"});
    
    const { body: payload } = req;
    const response = {}
    const userPayload = { ...payload.user }; 
    const addressPayload = {...payload.address};
    const user = await USERS.create(userPayload);
    // addressPayload.user_id = user.id
    // const address = await ADDRESSES.create(addressPayload);
    const address = await user.createAddresses(addressPayload)
    response.user = user
    response.address = address
    await generateToken(user.id, deviceToken);
    res.sendJson(200, "User created successfully", response);
  } catch (err) {
    next(err);
  }
};

//create new user with permit params
exports.createUserPermit = (req, res, next) => {
  try {
    const { body: payload } = req;
    const userPayload = Parameters({ ...payload.user }); //permit only required params in request params
    USERS.create(
      userPayload
        .permit("first_name", "last_name", "mobile_no", "is_deleted")
        .value()
    )
      .then((result) => {
        res.sendJson(200, "User created successfully", result);
      })
      .catch((err) => {
        res.sendJson(500, err.message || "something went wrong");
      });
  } catch (err) {
    next(err);
  }
};

//delete single user by id
exports.deleteById = (req, res, next) => {
  const id = req.params.id;
  USERS.destroy({ where: { id: id } })
    .then((result) => {
      if (result == 1) {
        res.sendJson(200, "User deleted successfully", result);
      } else {
        res.sendJson(200, `There is no user available with ${id}`);
      }
    })
    .catch((err) => {
      res.sendJson(500, err.message || "something went wrong");
    });
};

//delete all users
exports.deleteAll = (req, res, next) => {
  USERS.destroy({ where: {}, truncate: false }) // to actually delete record
    .then((result) => {
      res.sendJson(200, `${result} Users deleted successfully`);
    })
    .catch((err) => {
      res.sendJson(500, err.message || "something went wrong");
    });
};

//soft delete user
exports.softDelete = (req, res, next) => {
  const id = req.params.id;
  USERS.update(
    { is_deleted: true, deleted_at: Date.now() },
    { where: { id: id } }
  )
    .then((result) => {
      res.sendJson(200, `User soft deleted successfully`, result);
    })
    .catch((err) => {
      res.sendJson(500, err.message || "something went wrong");
    });
};

exports.testScope = async (req, res, next) => {
  console.log("test method")
  const response = []
  const id = req.params.id;
  const user = await USERS.findOne({
    attributes: userAttributes,
    where: { id: id }
  })
  console.log(user)
  response.push(user)
  const address = await user.getAddresses();
  console.log(address)
  response.push(address)
  res.sendJson(200, "All users", response)

};
