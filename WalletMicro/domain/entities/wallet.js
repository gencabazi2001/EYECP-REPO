const mongoose = require("mongoose");

module.exports = (db) => {
  var walletSchema = new mongoose.Schema(
    {
      userID:String,
      balance:Number,
      active: Boolean,
      history:[String],
      validationString:String,
    },
    {
      timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at",
      },
    }
  );
  return db.model("Wallets", walletSchema);
};
