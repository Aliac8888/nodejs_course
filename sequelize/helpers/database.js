const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("nodejs_sql", "root", "nodejs_course", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;