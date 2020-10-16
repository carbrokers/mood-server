const { Sequelize, Modal } = require('sequelize');
const { db } = require('../core/db');

class User extends Modal {

};

User.init({
  nickname: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING,
  openid: {
    type: Sequelize.STRING(64),
    unique: true
  }
}, {
  sequelize: db
});