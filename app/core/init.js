
const process = require('process');
const requireDirectory = require('require-directory');
const Router = require('koa-router');
const config = require('../config/config');
const exception = require('./exception');
class InitManager {
  static init(app) {
    InitManager.app = app;
    InitManager.initRouter();
    InitManager.initGlobalData();
  }

  static initRouter() {
    const routerPath = `${process.cwd()}/app/api`;
    requireDirectory(module, routerPath,  {
      visit: function visitor(obj) {
        if (obj instanceof Router) {
          InitManager.app.use(obj.routes());
        }
      }
    })
  }

  static initGlobalData() {
    global.config = config;
    global.errs = exception;
  }

}

module.exports = InitManager;