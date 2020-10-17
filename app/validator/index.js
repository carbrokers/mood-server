const userValidator = require('./user');
const tokenValidator = require('./token');

module.exports = {
  ...userValidator,
  ...tokenValidator
};