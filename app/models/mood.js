const { Model, DataTypes } = require('sequelize');

class Mood extends Model {
  static async createMood(createdBy, score, comment = '') {
    const result = await Mood.create({
      score,
      createdBy,
      comment
    });
    if (!result) {
      throw new global.errs.AuthException('创建心情失败');
    }
    return result;
  }
}

Mood.init({
  score: {
    type: DataTypes.NUMBER,
    allowNull: false
  },
  createdBy: DataTypes.INTEGER,
  comment: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
});

module.exports = {
  Mood
};