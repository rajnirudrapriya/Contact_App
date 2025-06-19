const serverless = require('serverless-http');
const app = require('../app'); // Ye app.js file se import karega

module.exports.handler = serverless(app);
