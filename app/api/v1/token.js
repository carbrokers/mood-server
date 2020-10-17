const Router = require('koa-router');
const { HttpException } = require('../../core/exception');

const router = new Router({
  prefix: '/api/v1/token'
});

module.exports = router;