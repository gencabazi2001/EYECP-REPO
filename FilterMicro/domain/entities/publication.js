const mongoose = require("mongoose");

module.exports = (db) => {
  var pubSchema = new mongoose.Schema(
    {
      _id: {type: mongoose.Schema.Types.ObjectId},
      file: String,
      userID: String,
      tags: [String],
      location: {
        latitude: Number,
        longitude: Number,
      },
    },
    {
      timestamps: {
        createdAt: "created_at",
      },
    }
  );
  return db.model("Publications", pubSchema);
};
