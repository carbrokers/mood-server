const Router = require('koa-router');
const { HttpException } = require('../../core/exception');

const router = new Router({
  prefix: '/api/v1/mood'
});
router.get('/', (ctx, next) => {
  throw new HttpException('爆炸', 10001, 503)
});

module.exports = router;


