const mongoConnect = require("../helpers/database");

class Task {
  constructor(title, description, imageUrl) {
    this.title = title;
    this.description = description;
    this.imageUrl = imageUrl;
  }

  save() {
    mongoConnect()
      .then((db) => {
        db.collection("tasks").insertOne(this);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = Task;
