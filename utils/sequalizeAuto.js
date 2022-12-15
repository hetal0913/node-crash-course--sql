const SequelizeAuto = require('sequelize-auto');
const Sequelize = require('sequelize');

const db = {
  name    : 'node-tuts',
  user    : 'root',
  pwd     : 'test123@',
  host    : 'localhost',
  dialect : 'mysql'
}

const sequelize = new Sequelize(db.name, db.user, db.pwd, { host: db.host, dialect: db.dialect });

const options = {
  directory: './models',
  caseModel: 'u',
  additional    : {
    timestamps  : true,
    createdAt   : "created_at",
    updatedAt   : "updated_at"
  },
  //tables: ['friends'] // use all tables, if omitted
}

const auto = new SequelizeAuto(sequelize, null, null, options);

// console.log(auto);

auto.run();