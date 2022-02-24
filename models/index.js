const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../Config/config.json')[env];
const User = require('./user');
const Role = require('./role');

const db = {};
const sequelize = new Sequelize(
  config.database, config.username, config.password, config
);

db.sequelize = sequelize;
db.User = User;
db.Role = Role;

User.init(sequelize);
Role.init(sequelize);

User.associate(db);
Role.associate(db);

module.exports = db;