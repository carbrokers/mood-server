const basicAuth = require('basic-auth');
const jwt = require('jsonwebtoken');

class Auth {
  static USERPROTITY = 8;
  static ADMINPROTITY = 16

  constructor(level = 4) {
    this.level = level;
  }

  get m() {
    return async (ctx, next) => {
      const userToken =  basicAuth(ctx.req);
      let decode;
      if (!userToken) {
        throw new global.errs.AuthException();
      }
      try {
        decode = jwt.verify(userToken.name, global.config.security.secretKey);
      } catch (err) {
        if (err.name === 'TokenExpiredToken') {
          throw new global.errs.AuthException('token已经过期');
        } else {
          throw new global.errs.AuthException('认证错误');
        }
      }

      if (decode.scope <= this.level) {
        throw new global.errs.AuthException('权限认证失败');
      }
      ctx.auth = {
        uid: decode.uid,
        scope: decode.scope
      };
      await next();
    }
  }
}

module.exports = Auth;