const Router = require('koa-router');
const { User } = require('../../models/user');
const { success, paramsExption } = require('../../lib/helper');

const router = new Router({
  prefix: '/api/v1/user'
});

router.get('/', async (ctx) => {
  ctx.body = "sdada";
})

router.post('/', async (ctx) => {
  ctx.checkBody('nickname', 'Invalid postparam').notEmpty();
  ctx.checkBody('password', 'Invalid postparam').notEmpty();
  ctx.checkBody('email', 'Invalid postparam').notEmpty().isUserAlreadyExits();
  let errors = await ctx.validationErrors();
  if (errors) {
    return paramsExption(errors[0].msg, 403)
  }
  const { nickname, password, email } = ctx.request.body;
  await User.create({
    nickname,
    password,
    email
  });
  success('创建成功', 200);
});

module.exports = router;