const mongoose = require("mongoose");
const follow = require("../entities/follow");
const block = require("../entities/block");
const conn2 = mongoose.createConnection(
  process.env.LOCAL_REL_DB,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log("connected to realtions db*******************")
);
relationdb = {};
relationdb.Follow = follow(conn2);
relationdb.Block = block(conn2);
exports.relationdb = relationdb;
