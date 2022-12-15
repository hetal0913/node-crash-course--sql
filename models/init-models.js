var DataTypes = require("sequelize").DataTypes;
var _ADDRESSES = require("./addresses");
var _AUTH_TOKENS = require("./auth_tokens");
var _BLOGS = require("./blogs");
var _COMMENTS = require("./comments");
var _USERS = require("./users");

function initModels(sequelize) {
  var ADDRESSES = _ADDRESSES(sequelize, DataTypes);
  var AUTH_TOKENS = _AUTH_TOKENS(sequelize, DataTypes);
  var BLOGS = _BLOGS(sequelize, DataTypes);
  var COMMENTS = _COMMENTS(sequelize, DataTypes);
  var USERS = _USERS(sequelize, DataTypes);

  COMMENTS.belongsTo(BLOGS, { as: "blog", foreignKey: "blog_id"});
  BLOGS.hasMany(COMMENTS, { as: "comments", foreignKey: "blog_id"});
  ADDRESSES.belongsTo(USERS, { as: "user", foreignKey: "user_id"});
  USERS.hasOne(ADDRESSES, { as: "addresses", foreignKey: "user_id"});
  AUTH_TOKENS.belongsTo(USERS, { as: "user", foreignKey: "user_id"});
  USERS.hasMany(AUTH_TOKENS, { as: "auth_tokens", foreignKey: "user_id"});
  BLOGS.belongsTo(USERS, { as: "created_by", foreignKey: "created_by_id"});
  USERS.hasMany(BLOGS, { as: "blogs", foreignKey: "created_by_id"});

  return {
    ADDRESSES,
    AUTH_TOKENS,
    BLOGS,
    COMMENTS,
    USERS,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
