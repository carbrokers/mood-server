const { HttpException } = require('../core/exception');

const catchException = async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    if (err instanceof HttpException) {
      ctx.body = {
        msg: err.msg,
        errorCode: err.errorCode,
      };
      ctx.status = err.status
    } 
  }
}

module.exports = catchException;