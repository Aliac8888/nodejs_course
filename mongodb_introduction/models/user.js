const mongodb = require("mongodb");
const mongoConnect = require("../helpers/database");
const objectId = mongodb.ObjectId.createFromHexString;

class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }

  save() {
    return mongoConnect()
      .then((db) => {
        return db.collection("users").insertOne(this);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static findById(userId) {
    return mongoConnect()
      .then((db) => {
        return db.collection("users").findOne({ _id: objectId(userId) });
      })
      .catch((err) => console.log(err));
  }
}

module.exports = User;
