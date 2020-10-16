const Router = require('koa-router');
const { HttpException } = require('../../core/exception');

const router = new Router();
router.get('/v1/mood', (ctx, next) => {
  throw new HttpException(10001, '爆炸', 503)
});

module.exports = router;


