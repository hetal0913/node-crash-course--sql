const Sequelize= require('sequelize').Sequelize;
const initModels = require('../models/init-models');
const {database, dialect} = require('../config')

/**
 * Database connection
 */

const sequelize = new Sequelize(database.name, database.user, database.password, {
    host    : database.host,
    dialect : dialect,
    pool    :{
        idle : 120000,
        acquire: 120000,
    },
  });

/**
 * Check database connection
 */

sequelize.authenticate()
    .then(() => console.log("Database Connected"))
    .catch((err) => { console.log("Database Error : ", err); process.exit(0)});


/**
 * Initialize all models and pass sequelize connection object
 */
const db = initModels(sequelize);

/**
 * Set sequelize connection object globally
 */
global.sequelize = sequelize;

module.exports = db;