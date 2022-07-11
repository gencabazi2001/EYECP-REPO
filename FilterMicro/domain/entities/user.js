const mongoose = require("mongoose");

module.exports = (db) => {
  var userSchema = new mongoose.Schema(
    {
      _id: {type: mongoose.Schema.Types.ObjectId},
      username: String,
      isPrivate: Boolean,
      profileImage: String
    },
    {
      timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at",
      },
    }
  );
  return db.model("Users", userSchema);
};
