const Sequelize = require('sequelize');
const database = require('../config/config').database;

const { dbName, host, user, password, port } = database;
const sequelize = new Sequelize(dbName, user, password, {
  host,
  port,
  logging: true,
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