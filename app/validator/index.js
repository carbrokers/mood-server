const userValidator = require('./user');
const tokenValidator = require('./token');
const common = require('./common');

module.exports = {
  ...userValidator,
  ...tokenValidator,
  ...common
};