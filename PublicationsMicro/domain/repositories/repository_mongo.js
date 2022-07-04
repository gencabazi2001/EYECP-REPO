const mongoose = require("mongoose");
const pub = require("../entities/publication");
const tag = require("../entities/tag");
const user = require("../entities/user")

const conn1 = mongoose.createConnection(
  "mongodb://localhost:27017/PublicationsDB",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log("connected to publication db*******************")
);
db = {};
db.Pub = pub(conn1);
// db.Tag = tag(conn1);
db.User = user(conn1)

exports.db = db;
