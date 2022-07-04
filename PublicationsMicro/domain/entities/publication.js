const mongoose = require("mongoose");

module.exports = (db) => {
  var likeSchema = new mongoose.Schema(
    {
      userID: String,
    },
    {
      timestamps: {
        createdAt: "created_at",
      },
    }
  );
  var commentSchema = new mongoose.Schema(
    {
      userID: String,
      comment: String,
      likes: [likeSchema],
    },
    {
      timestamps: {
        createdAt: "created_at",
      },
    }
  );

  var pubSchema = new mongoose.Schema(
    {
      caption: String,
      file: String,
      userID: String,
      likes: [likeSchema],
      comments: [commentSchema],
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
