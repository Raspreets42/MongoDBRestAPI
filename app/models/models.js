const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;
db.tutorials = require('./tutorials.model')(mongoose);
db.users = require('./users.model')(mongoose);
db.roles = require('./roles.model');
db.Roles = ["user", "admin", "superadmin"];

module.exports = db;