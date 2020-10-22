const path = require('path');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const serve = require('koa-static');
const koaValidator = require('koa-async-validator');
const InitManager = require('./app/core/init');
const excepition  = require('./app/middleware/catch-exception');
const notFoundPage = require('./app/middleware/not-found');
const customValidators = require('./app/validator');

const app = new Koa();
app.use(bodyParser());
app.use(koaValidator({
  customValidators
}));
app.use(excepition);
app.use(serve(path.resolve(__dirname, './app/static')));
InitManager.init(app);
app.use(notFoundPage);

app.listen(4000);