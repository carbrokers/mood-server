const Router = require('koa-router');
const { HttpException } = require('../../core/exception');
const Auth = require('../../middleware/auth');
const { Mood } = require('../../models/mood');
const { success, formatDate } = require('../../lib/helper');

const router = new Router({
  prefix: '/api/v1/mood'
});

router.get('/', new Auth().m, async (ctx, next) => {
  const { uid } = ctx.auth;
  const { date } = ctx.request.params;
  const now = date || Date.now();
  const moods = await Mood.getMoodsByDate(uid, now);
  ctx.body = {
    moods
  }
});

router.post('/create', new Auth().m, async (ctx, next) => {
  ctx.checkBody('score', 'Invalid postparam').notEmpty().isNumber();
  let errors = await ctx.validationErrors();
  if (errors) {
    return paramsExption(errors[0].msg, 403);
  }
  const { uid } = ctx.auth;
  const { score, comment } = ctx.request.body;
  await Mood.createMood(uid, score, comment);
  success('create success', 200);
});

module.exports = router;


