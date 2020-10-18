const Router = require('koa-router');
const { User } = require('../../models/user');
const { loginType } = require('../../lib/enum');
const { paramsExption } = require('../../lib/helper');
const { generateToken } = require('../../lib/helper');
const  WXManager = require('../services/wx');

const router = new Router({
  prefix: '/api/v1/token'
});

router.post('/', async (ctx) => {
  ctx.checkBody('type', '登录方式出错').notEmpty().isLoginTypeSupport();
  const errors = await ctx.validationErrors();
  if (errors[0]) {
    return paramsExption(errors[0].msg, 403)
  }
  const { type } = ctx.request.body;
  let token = null;
  try {
    switch (type) {
      case loginType.ACCOUNTLOGIN:
        token = await accountLogin(ctx.request.body.email, ctx.request.body.password);
        break;
      case loginType.WECHATLOGIN:
        token = await WXManager.codeToToken(ctx.request.body.code);
        break;
      case loginType.GITHUBLOGIN:
        break;
      default:
        paramsExption('验证失败', 403);
        break;
    }
  } catch (err) {
    throw err;
  }
  ctx.body = {
    token
  };
});

const accountLogin = async (email, password) => {
  const user = await User.verityEmailAndPwd(email, password);
  return generateToken(user.isSoftDeleted, 2);
}

module.exports = router;