const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const koaValidator = require('koa-async-validator');
const InitManager = require('./app/core/init');
const excepition  = require('./app/middleware/catch-exception');
const customValidators = require('./app/validator');

const app = new Koa();
app.use(bodyParser());
app.use(koaValidator({
  customValidators
}));
app.use(excepition);
InitManager.init(app);

app.listen(4000);