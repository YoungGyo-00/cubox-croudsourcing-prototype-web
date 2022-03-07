const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../Config/config.json')[env];
const User = require('./user');
const Role = require('./role');
const Center = require('./center');
const Cstate = require('./cstate');
const Supervisor = require('./supervisor');
const Worker = require('./worker');
const Job = require('./job');
const Jstate = require('./jstate');
const Project = require('./project');
const Pstate = require('./pstate');

const db = {};
const sequelize = new Sequelize(
  config.database, config.username, config.password, config
);

db.sequelize = sequelize;
db.User = User;
db.Role = Role;
db.Center = Center;
db.Worker = Worker;
db.Supervisor = Supervisor;
db.Cstate = Cstate;
db.Job = Job;
db.Jstate = Jstate;
db.Project = Project;
db.Pstate = Pstate;

User.init(sequelize);
Role.init(sequelize);
Center.init(sequelize);
Worker.init(sequelize);
Supervisor.init(sequelize);
Cstate.init(sequelize);
Job.init(sequelize);
Jstate.init(sequelize);
Project.init(sequelize);
Pstate.init(sequelize);

User.associate(db);
Role.associate(db);
Center.associate(db);
Worker.associate(db);
Supervisor.associate(db);
Cstate.associate(db);
Job.associate(db);
Jstate.associate(db);
Project.associate(db);
Pstate.associate(db);

module.exports = db;