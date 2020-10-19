const { Model, DataTypes } = require('sequelize');
const { db } = require('../core/db');
const { User } = require('./user');
class Mood extends Model {
  static async createMood(createdBy, score, comment = '') {
    try {
      await Mood.create({
        score,
        createdBy,
        comment
      });
    } catch (err) {
      throw new global.errs.AuthException('创建心情失败');
    } 
  }

  static async findMoodsByUserId(createdBy) {
    try {
      const moods = await User.find({
        where: {
          createdBy
        }
      });
      return moods;
    } catch (err) {
      throw 
    }
  }

}

Mood.init({
  score: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  createdBy: DataTypes.INTEGER,
  comment: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
}, {
  sequelize: db
});

module.exports = {
  Mood
};