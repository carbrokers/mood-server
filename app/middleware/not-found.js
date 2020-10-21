const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../static/notfound/index.html');
const content = fs.readFileSync(filePath)

const catchNotFoundPage = async (ctx, next) => {
  if (ctx.status === 404) {
    ctx.response.type = 'html';
    ctx.response.body = content;
  }
}

module.exports = catchNotFoundPage;