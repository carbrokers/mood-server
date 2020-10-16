const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const InitManager = require('./app/core/init');
const excepition  = require('./app/middleware/catch-exception');

const app = new Koa();
app.use(bodyParser())
app.use(excepition);
InitManager.init(app);

app.listen(4000);