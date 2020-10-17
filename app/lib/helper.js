const jwt = require('jsonwebtoken');
const { Success, ParamsException } = require('../core/exception');

const success = (msg, status = 200) => {
  throw new Success(msg, 0, status);
};

const paramsExption = (msg, status) => {
  throw new ParamsException(msg, 20001, status);
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