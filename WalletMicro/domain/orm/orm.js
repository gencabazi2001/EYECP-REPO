const conn = require("../repositories/repository_mongo");
const dto = require("../DTO/index");
const crypto = require("crypto");

exports.CreateWallet = async (createWalletDTO) => {
  try {
    const wallet = await new conn.db.Wallet({
      userID: createWalletDTO.UserID,
      balance: createWalletDTO.Balance,
      active: createWalletDTO.Active,
    });
    wallet.save();
    return true;
  } catch (err) {
    console.log(" err Register = ", err);
    return await { err: { code: 123, messsage: err } };
  }
};
exports.DeleteWallet = async (deleteWalletDTO) => {
  try {
    let deletedWallet = await conn.db.Wallet.updateOne({_id:deleteWalletDTO.WalletID},{$set :{active:false}});
    if (deletedWallet.modifiedCount ==1 ) {
      return true
    } else {
      throw "couldn't delete wallet"
    }
  } catch (err) {
    console.log(" err Transaction = ", err);
    return await { err: { code: 123, messsage: err } };
  }
};
exports.GetTransactions = async (getTransactionsDTO) => {
  try {
    let transactions = await conn.db.Transaction.find({
      userID: getTransactionsDTO.UserID,
    });
    if (transactions.length >= 1) {
      return transactions;
    } else {
      throw "this user has no transactions";
    }
  } catch (err) {
    console.log(" err Transaction = ", err);
    return await { err: { code: 123, messsage: err } };
  }
};
exports.GetWallets = async (getWalletsDTO) => {
  try {
    let wallets = await conn.db.Wallet.find({ userID: getWalletsDTO.UserID,active:true });
    if (wallets.length >= 1) {
      return wallets;
    } else {
      throw "this user has no wallets";
    }
  } catch (err) {
    console.log(" err Register = ", err);
    return await { err: { code: 123, messsage: err } };
  }
};
exports.RegisterUser = async (msg) => {
  try {
    const usr = await new conn.db.User({
      _id: msg._id,
      name: msg.name,
      email: msg.email,
    });
    usr.save();
    let obj = {
      UserID: msg._id,
      Balance: 0.0,
      Active: true,
    };
    this.CreateWallet(obj);
  } catch (err) {
    console.log(" err Register = ", err);
    return await { err: { code: 123, messsage: err } };
  }
};
exports.ChangeOwner = async (changeOwnerDTO) => {
  try {
    const owner = await conn.db.User.findOne({
      _id: changeOwnerDTO.OwnerUserID,
    });
    const validation = crypto.randomBytes(256).toString("hex");
    let filter = { _id: changeOwnerDTO.WalletID };

    let postfix = changeOwnerDTO.NewOwnerUserID + "_" + validation;
    await conn.db.Wallet.update(filter, { validationString: validation });
    let ret = {
      email: owner.email,
      name: owner.name,
      postFix: postfix,
    };
    return ret;
  } catch (err) {
    console.log(" err Change  Owner = ", err);
    return await { err: { code: 123, messsage: err } };
  }
};
exports.Authenticate = async (authenticateDTO) => {
  try {
    let arr = authenticateDTO.postfix.split("_");
    let newUserID = arr[0];
    let theValidationString = arr[1];
    const wallet = await conn.db.Wallet.findOne({
      validationString: theValidationString,
    });

    let oldUserID = wallet.userID;

    await conn.db.Wallet.findOneAndUpdate(
      { _id: wallet._id },
      {
        $set: { userID: newUserID },
        $addToSet: { history: oldUserID },
        $set: { validationString: null },
      }
    );
    return true;
  } catch (err) {
    console.log(" err Change  Owner = ", err);
    return await { err: { code: 123, messsage: err } };
  }
};
