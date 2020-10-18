const Router = require('koa-router');
const { HttpException } = require('../../core/exception');
const Auth = require('../../middleware/auth');

const router = new Router({
  prefix: '/api/v1/mood'
});

router.get('/', new Auth().m, async (ctx, next) => {
  ctx.body = {
    success: true
  };
});

module.exports = router;


