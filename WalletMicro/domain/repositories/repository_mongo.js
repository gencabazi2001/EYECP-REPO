const mongoose = require("mongoose");
const wallet = require("../entities/wallet");
const transaction = require("../entities/transaction");
const user = require("../entities/user")
const conn1 = mongoose.createConnection(
  "mongodb://localhost:27017/WalletDB",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log("connected to wallet db*******************")
);
db = {};
db.Wallet = wallet(conn1);
db.Transaction = transaction(conn1);
db.User = user(conn1)
exports.db = db;
