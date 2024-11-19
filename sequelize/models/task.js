const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../helpers/database");

const Task = sequelize.define("Task", {
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  title: { type: DataTypes.STRING, allowNull: false },
  description: DataTypes.TEXT,
  imageUrl: DataTypes.STRING,
});

module.exports = Task;