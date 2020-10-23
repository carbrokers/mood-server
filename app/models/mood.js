const { Model, DataTypes, Op } = require('sequelize');
const { db } = require('../core/db');
const { User } = require('./user');
const { formatDate, addDays } = require('../lib/helper');
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

  static async getMoodsByDate(createdBy, now, gap = -2) {
    const result = {};
    const beforeDateStamp = addDays(startDate, gap);
    const before = formatDate(beforeDateStamp);
    try {
      const moods = Moods.findMoodsInGap(before, now, createdBy);
      moods.reduce((acc, cur) => {
        const { date } = acc;
        acc[date] ? null : acc[date] = [];
        acc[date].push(cur);
      }, result);
      return moods;
    } catch (err) {
      throw err;
    }
  }

  static async findMoodsInGap(start, end, createdBy) {
    try {
      const moods = await Mood.findAll({
        where: {
          createdBy,
          createdAt: {
            [Op.between]: [start, end]
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