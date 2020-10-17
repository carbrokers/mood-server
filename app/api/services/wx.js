const util = require('util');
const axios = require('axios');
const { User } = require('../../models/user');
const Auth = require('../../middleware/auth');
const { generateToken } = require('../../lib/helper');

class WXManager {
  static async codeToToken(code) {
    const { appId, appSecret, loginUrl } = global.config.wx;
    const url = util.format(loginUrl, appId, appSecret, code);
    const result = await axios.get(url);
    if (!result.data) {
      throw new global.errs.AuthException('获取openid失败');
    } else {
      const { openid, errcode, errmsg } = result.data;
      if (errcode !== 0) {
        throw new global.errs.AuthException(errmsg);
      }
      let user = await User.findUserByOpenId(openid);
      if (!user) {
        user = await User.createUserByOpenId(openid);
      }
      const token = generateToken(user.id, Auth.USERPROTITY);
      return token;
    }
  }
}

module.exports = WXManager;