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
  }
}