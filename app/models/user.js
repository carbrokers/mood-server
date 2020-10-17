const bcrypt = require('bcryptjs');
const { Model, DataTypes } = require('sequelize');
const { db } = require('../core/db');

class User extends Model {
  
};

User.init({
  nickname: DataTypes.STRING,
  email: DataTypes.STRING,
  password: {
    type: DataTypes.STRING,
    set(val) {
      let salt = bcrypt.genSaltSync(10);
      let pwd = bcrypt.hashSync(val, salt);
      this.setDataValue(pwd);
    }
  },
  openid: {
    type: DataTypes.STRING(64),
    unique: true
  }
}, {
  sequelize: db
});

module.exports = {
  User
};