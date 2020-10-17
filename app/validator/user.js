const { User } = require('../models/user');

const isUserAlreadyExits = async (email) => {
  try {
    const user = await User.findOne({
      where: {
        email
      }
    });
    return !!!user;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  isUserAlreadyExits
};