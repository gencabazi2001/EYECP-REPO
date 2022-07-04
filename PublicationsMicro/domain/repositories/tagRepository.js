const mongoose = require("mongoose");
const tag = require("../entities/tag");
const follow = require("../entities/follow")
const block = require("../entities/block")

const conn2 = mongoose.createConnection(
  "mongodb://localhost:27017/UserRelationsDB",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log("connected to realtions db*******************")
);
db = {};

db.Tag = tag(conn2);
db.Follow = follow(conn2)
db.Block = block(conn2)
exports.db = db;
