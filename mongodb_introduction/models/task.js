const mongodb = require('mongodb');
const mongoConnect = require("../helpers/database");

class Task {
  constructor(title, description, imageUrl) {
    this.title = title;
    this.description = description;
    this.imageUrl = imageUrl;
  }

  save() {
    return mongoConnect()
      .then((db) => {
        db.collection("tasks").insertOne(this);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static findAll() {
    return mongoConnect()
      .then((db) => {
        return db.collection("tasks").find().toArray();
      })
      .catch((err) => console.log(err));
  }

  static findById(taskId) {
    return mongoConnect()
      .then((db) => {
        return db
          .collection("tasks")
          .find({ _id: new mongodb.ObjectId(taskId) })
          .next();
      })
      .catch((err) => console.log(err));
  }
}

module.exports = Task;
