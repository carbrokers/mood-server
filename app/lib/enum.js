const plain = Object.create(null);

const chooseType = (type) => {
  console.log(this)
  for (let key in this) {
    if (this[key] === type) {
      return key;
    }
  }
  return null;
}

const loginType = Object.assign({}, plain, {
  "ACCOUNTLOGIN": 100,
  "WECHATLOGIN": 200,
  "GITHUBLOGIN": 300,
});



module.exports = {
  loginType
}