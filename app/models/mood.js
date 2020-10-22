const { Model, DataTypes, Op } = require('sequelize');
const { formatDate } = require('../lib/helper');
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
      throw global.errs.DBQueryException();
    }
  }

  static async getMoodsByDate(createdBy, startDate, limit = 2) {
    const result = [];
    const endDateStamp = addDays(startDate, limit);
    var start = new Date(startDate);
    var end = new Date(endDateStamp);
    try {
      const moods = await Mood.findAll({
        where: {
          createdBy,
          createdAt: {
            [Op.between]: [end, start]
          }
        },
        attributes: [
          'id',
          'score',
          [db.fn('date_format', db.col('createdAt'), '%Y-%m-%d'), 'date']
        ],
        order: [
          ['createdAt', 'DESC'],
        ],
      });
      return moods;
    } catch (err) {
      throw global.errs.DBQueryException();
    }
  }
}

function addDays(date, days) {
  let result = new Date(date);
  result.setDate(result.getDate() - days);
  return result;
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