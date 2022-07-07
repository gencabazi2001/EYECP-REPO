const mongoose = require("mongoose");

module.exports = (db) => {
  var transactionSchema = new mongoose.Schema(
    {
      userID:String,
      value:Number,
      likes: Number,
      theDate: Date
    },
    {
      timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at",
      },
    }
  );
  return db.model("Transactions", transactionSchema);
};