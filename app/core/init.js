
const process = require('process');
const requireDirectory = require('require-directory');
const Router = require('koa-router');

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
}

module.exports = InitManager;