const monk = require('monk');
const db = monk('localhost/webtech_2');


module.exports = db;