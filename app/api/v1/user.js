const Router = require('koa-router');
const { User } = require('../../models/user');

const router = new Router({
  prefix: '/api/v1/user'
});

router.get('/', async (ctx) => {
  
});

module.exports = router;