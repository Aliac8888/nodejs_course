const db = require("../helpers/database");

module.exports = class {
  constructor(title, description, imageUrl) {
    this.id = Math.ceil(Math.random() * 10000000).toString();
    this.title = title;
    this.description = description;
    this.imageUrl = imageUrl;
  }

  async save() {
    return db.execute(
      "INSERT INTO tasks (title,description,imageUrl) Values (?,?,?)",
      [this.title, this.description, this.imageUrl]
    );
  }

  static getAll() {
    return db.execute("SELECT * FROM tasks");
  }

  static findById(id) {
    return db.execute("SELECT * FROM tasks WHERE tasks.id = ?",[id]);
  }

  static updateTask(id, title, description, imageUrl) {
    return db.execute(
      "UPDATE tasks SET tasks.title = ?,tasks.description = ?, tasks.imageUrl = ? WHERE tasks.id = ?",
      [title, description, imageUrl, id]
    );
  }

  static deleteTask(id) {
    return db.execute("DELETE FROM tasks WHERE id = ?",[id])
  }
};
