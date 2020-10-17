module.exports = {
  database: {
    dbName: 'mood',
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    dialect: 'mysql'
  },
  security: {
    secretKey: '2121',
    expiresIn: 60 * 60
  },
  wx: {
    appId: 'wx2d56f8db2513ff2b',
    appSecret: '80cf1f4a890765b32adbeab987f90d2f',
    loginUrl: 'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code'
  }
}