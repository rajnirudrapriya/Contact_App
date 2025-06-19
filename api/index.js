const serverless = require('serverless-http');
const app = require('../server'); // server.js ko import kiya

module.exports.handler = serverless(app);
