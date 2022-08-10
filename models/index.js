require("dotenv").config();

const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: process.env.DB,
  logging: false,
});

const db = {}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Users = require("./users.js")(sequelize, Sequelize);
db.Recipe = require("./recipe.js")(sequelize, Sequelize);

module.exports = db;  