const jwt = require('jsonwebtoken');
const { Success, ParamsException } = require('../core/exception');

const success = (msg, status) => {
  throw new Success(0, msg, status);
};

const paramsExption = (msg, status) => {
  throw new ParamsException(20001, msg, status);
};

const generateToken = (uid, scope) => {
  const { secretKey, expiresIn } = global.config.security;
  const token = jwt.sign({
    uid,
    scope
  }, secretKey, {
    expiresIn
  });
  return token;
};

module.exports = {
  success,
  paramsExption,
  generateToken
};