const path = require("path");
const fs = require("fs");
const rootDir = require("../helpers/rootDir");

const filePath = path.join(rootDir, "data", "tasks.json");

const getAllTasks = async () => {
  try {
    const data = await fs.promises.readFile(filePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.log(error);
    return [];
  }
};

module.exports = class {
  constructor(title, description, imageUrl) {
    this.id = Math.ceil(Math.random() * 10000000).toString();
    this.title = title;
    this.description = description;
    this.imageUrl = imageUrl;
  }

  async save() {
    const tasks = await getAllTasks();
    let taskExists = false;
    if (tasks.length > 0) {
      tasks.forEach((task) => {
        if (task.title === this.title) {
          console.log("task already exists.");
          return (taskExists = true);
        }
      });
    }
    if (taskExists) {
      return false;
    }
    fs.writeFileSync(filePath, JSON.stringify([...tasks, this]));
    return true;
  }

  static async getAll() {
    return await getAllTasks();
  }

  static async findById(id) {
    const tasks = await getAllTasks();
    const task = tasks.find((t) => t.id === id);
    return task;
  }
};
