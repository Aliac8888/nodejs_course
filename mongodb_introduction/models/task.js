const mongodb = require("mongodb");
const mongoConnect = require("../helpers/database");
const objectId = mongodb.ObjectId.createFromHexString;

class Task {
  constructor(title, description, imageUrl, _id, userId) {
    this.title = title;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = _id;
    this.userId = userId;
  }

  save() {
    return mongoConnect()
      .then((db) => {
        if (this._id) {
          return db.collection("tasks").updateOne(
            {
              _id: objectId(this._id),
            },
            {
              $set: {
                title: this.title,
                description: this.description,
                imageUrl: this.imageUrl,
                userId: this.userId,
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
          .find({ _id: objectId(taskId) })
          .next();
      })
      .catch((err) => console.log(err));
  }

  static deleteById(taskId){
    return mongoConnect()
      .then((db) => {
        return db.collection("tasks").deleteOne({ _id: objectId(taskId) });
      })
      .catch((err) => console.log(err));
  }
}

module.exports = Task;
