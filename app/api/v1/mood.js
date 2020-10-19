const Router = require('koa-router');
const { HttpException } = require('../../core/exception');
const Auth = require('../../middleware/auth');
const { Mood } = require('../../models/mood');

const router = new Router({
  prefix: '/api/v1/mood'
});

router.post('/create', new Auth().m, async (ctx, next) => {
  ctx.checkBody('mood', 'Invalid postparam').notEmpty().isNumber();
  let errors = await ctx.validationErrors();
  if (errors) {
    return paramsExption(errors[0].msg, 403);
  }
  const { uid } = ctx.auth;
  const { score, comment } = ctx.request.body;
  const result = await Mood.createMood(uid, score, comment);
  if (result) {
    ctx.body = {
      success: true,
      msg: 'create success'
    }
  }
});

module.exports = router;


