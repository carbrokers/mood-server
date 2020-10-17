const basicAuth = require('basic-auth');
const jwt = require('jsonwebtoken');

class Auth {
  constructor(level = 4) {
    this.level = level;
    Auth.USERPROTITY = 8;
    Auth.ADMINPROTITY = 16;
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

      if (this.level <= decode.scope) {
        throw new new global.errs.AuthException('权限认证失败');
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