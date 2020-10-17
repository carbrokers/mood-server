class HttpException extends Error {
  constructor(msg = '请求错误', errorCode = 10001, status = 400) {
    super()
    this.errorCode = errorCode;
    this.msg = msg;
    this.status = status
  }
}

class ParamsException extends HttpException {
  constructor(msg = '参数错误', errorCode = 20001, status = 403) {
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
  constructor(msg = '认证错误', errorCode = 10003, status = 403) {
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
  AuthException
};