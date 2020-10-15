const Koa = require('koa');
const InitManager = require('./app/core/init');
const app = new Koa();

InitManager.init(app);

app.listen(4000);