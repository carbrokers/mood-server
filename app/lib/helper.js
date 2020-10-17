const { Success } = require('../core/exception');

const success = (msg, status) => {
  throw new Success(0, msg, status);
}

module.exports = {
  success
};