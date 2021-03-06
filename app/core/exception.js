class HttpException extends Error {
  constructor(msg = '请求错误', errorCode = 10, status = 400) {
    super()
    this.errorCode = errorCode;
    this.msg = msg;
    this.status = status
  }
}

class ParamsException extends HttpException {
  constructor(msg = '参数错误', errorCode = 43, status = 403) {
    super()
    this.errorCode = errorCode;
    this.msg = msg;
    this.status = status
  }
}

class Success extends HttpException {
  constructor(msg = 'ok', errorCode = 0,status = 201) {
    super()
    this.errorCode = errorCode;
    this.msg = msg;
    this.status = status
  }
}

class AuthException extends HttpException {
  constructor(msg = '权限不足', errorCode = 11, status = 403) {
    super()
    this.errorCode = errorCode;
    this.msg = msg;
    this.status = status
  }
}

class DBQueryException extends HttpException {
  constructor(msg = '数据库查询出错', errorCode = 50, status = 200) {
    super()
    this.errorCode = errorCode;
    this.msg = msg;
    this.status = status
  }
}

module.exports = {
  HttpException,
  Success,
  ParamsException,
  AuthException,
  DBQueryException
};