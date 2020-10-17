const Sequelize = require('sequelize');
const database = require('../config/config').database;

const { dbName, host, user, password, port, dialect } = database;
const sequelize = new Sequelize(dbName, user, password, {
  dialect,
  host,
  port,
  logging: console.log,
  timezone: '+08:00',
  define: {
    timestamps: true,
    paranoid: true
  }
});

sequelize.sync();

module.exports = {
  db: sequelize
};