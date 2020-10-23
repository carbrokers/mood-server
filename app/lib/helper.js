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

const formatDate = (timestamp) => {
  const time = timestamp ? new Date(timestamp) : new Date();
  const date =  time.getFullYear() + "-" + (time.getMonth()+1) + "-" + time.getDate();
  return date;
}

const addDays = (date, days) => {
  let result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

module.exports = {
  success,
  paramsExption,
  generateToken,
  formatDate,
  addDays
};