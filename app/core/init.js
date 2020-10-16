
const process = require('process');
const requireDirectory = require('require-directory');
const Router = require('koa-router');
const config = require('../config/config');
class InitManager {
  static init(app) {
    InitManager.app = app;
    InitManager.initRouter();
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

  static initGlobalConfig() {
    global.config = config;
  }

}

module.exports = InitManager;