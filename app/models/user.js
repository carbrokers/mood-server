const bcrypt = require('bcryptjs');
const { Model, DataTypes } = require('sequelize');
const { db } = require('../core/db');

class User extends Model {
  static async verityEmailAndPwd(email, password) {
    const user = await User.findOne({
      where: {
        email
      }
    });
    if (!user) {
      throw new global.errs.AuthException();
    }
    if (!bcrypt.compareSync(password, user.password)) {
      throw new global.errs.AuthException();
    }
    return user;
  }

  static async findUserByOpenId(openId) {
    const user = await User.findOne({
      where: { openId }
    });
    return user;
  }

  static async createUserByOpenId(openId) {
    const user = await User.create({
      openId
    });
    return user;
  }

};

User.init({
  nickname: DataTypes.STRING,
  email: DataTypes.STRING,
  password: {
    type: DataTypes.STRING,
    set(val) {
      let salt = bcrypt.genSaltSync(10);
      let pwd = bcrypt.hashSync(val, salt);
      this.setDataValue('password', pwd);
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