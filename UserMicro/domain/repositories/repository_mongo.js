const mongoose = require("mongoose");
const user = require("../entities/user");
const tag = require("../entities/tag");
const admin = require("../entities/admin");
const conn1 = mongoose.createConnection(
  process.env.LOCAL_USER_DB,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log("connected to user db*******************")
);
db = {};
db.User = user(conn1);
db.Tag = tag(conn1);
db.Admin = admin(conn1);

exports.db = db;
