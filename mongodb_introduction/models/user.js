const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../helpers/database");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  name: { type: DataTypes.STRING, allowNull: false },
  email: DataTypes.STRING,
});

module.exports = User;
