const mongoose = require("mongoose");
const user = require("../entities/user");
const publication = require("../entities/publication");
const conn1 = mongoose.createConnection(
  process.env.LOCAL_FILTER_DB,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log("connected to user db*******************")
);
db = {};
db.User = user(conn1);
db.Pub = publication(conn1);

exports.db = db;
