const mongodb = require("mongodb");
const mongoConnect = require("../helpers/database");

class Task {
  constructor(title, description, imageUrl, _id) {
    this.title = title;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = _id;
  }

  save() {
    return mongoConnect()
      .then((db) => {
        if (this._id) {
          return db.collection("tasks").updateOne(
            {
              _id: new mongodb.ObjectId(this._id),
            },
            {
              $set: {
                title: this.title,
                descirption: this.description,
                imageUrl: this.imageUrl,
              },
            }
          );
        } else {
          return db.collection("tasks").insertOne(this);
        }
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
