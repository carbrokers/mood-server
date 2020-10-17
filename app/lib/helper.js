const { Success, ParamsException } = require('../core/exception');

const success = (msg, status) => {
  throw new Success(0, msg, status);
}

const paramsExption = (msg, status) => {
  throw new ParamsException(20001, msg, status);
}

module.exports = {
  success,
  paramsExption
};