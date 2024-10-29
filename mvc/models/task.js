const tasks = [];

module.exports = class {
  constructor(taskTitle) {
    this.title = taskTitle;
  }

  save() {
    tasks.push(this);
  }

  static getAll() {
    return tasks;
  }
};
