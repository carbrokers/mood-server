class HttpException extends Error {
  constructor(errorCode = 10001, msg = '请求错误', status = 400) {
    super()
    this.errorCode = errorCode;
    this.msg = msg;
    this.status = status
  }
}

module.exports = {
  HttpException,
};