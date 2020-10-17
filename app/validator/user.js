const { User } = require('../models/user');

const isUserAlreadyExits = async (email) => {
  if (!email) {
    return false;
  }
  try {
    const user = await User.findOne({email});
    return !!!user;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  isUserAlreadyExits
};