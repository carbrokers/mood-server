const { loginType } = require('../lib/enum');

const isLoginTypeSupport = async (type) => {
  for (let key in loginType) {
    if (loginType[key] === type);
    return true;
  }
  return result;
}

module.exports = {
  isLoginTypeSupport
}