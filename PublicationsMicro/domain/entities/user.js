const mongoose = require("mongoose");

module.exports = (db) => {
  var userSchema = new mongoose.Schema(
    {
      _id: {type: mongoose.Schema.Types.ObjectId},
      name: String,
      username: String,
      profileImage: String,
      isPrivate:Boolean,
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
