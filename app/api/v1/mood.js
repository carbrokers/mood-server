const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

const router = new Router();
router.get('/v1/mood', (ctx, next) => {
  ctx.body = 'dada'
});

module.exports = router;


