const conn = require("../repositories/repository_mongo");
const dto = require("../DTO/index");
const crypto = require("crypto");


exports.CreateWallet = async (createWalletDTO) => {
  try {
    const wallet = await new conn.db.Wallet({
      userID: createWalletDTO.UserID,
      bilance: createWalletDTO.Bilance,
      active:createWalletDTO.Active
    });
    wallet.save();
    return true;
  } catch (err) {
    console.log(" err Register = ", err);
    return await { err: { code: 123, messsage: err } };
  }
};

exports.GetWallets = async (getWalletsDTO) => {
  try {
    let wallets = await conn.db.Wallet.find({userID:getWalletsDTO.UserID})
    if (wallets.length >=1) {
      return wallets
    } else {
      throw "this user has no wallets"
    }
  } catch (err) {
    console.log(" err Register = ", err);
    return await { err: { code: 123, messsage: err } };
  }
};
/*
  post method to set the status of trying to change the owner
  prepare the generic url with that validation string to send in email via kafka
  when the url is clicked it's a get method that re-sets the value to null and therefore changes the wallet's owner!
*/


exports.RegisterUser = async (msg) => {
  try {
    const usr = await new conn.db.User({
      _id: msg._id,
      name: msg.name,
      email: msg.email,
    });
    usr.save();
  } catch (err) {
    console.log(" err Register = ", err);
    return await { err: { code: 123, messsage: err } };
  }
};

exports.ChangeOwner = async (changeOwnerDTO) => {
  try {
    const owner = await conn.db.User.findOne({_id:changeOwnerDTO.OwnerUserID})
    const validation = crypto.randomBytes(256).toString("hex");
    let filter = {_id:changeOwnerDTO.WalletID}

    let postfix =changeOwnerDTO.NewOwnerUserID + "_" + validation
    await conn.db.Wallet.update(filter, {validationString:validation})
    let ret = {
      email : owner.email,
      name: owner.name,
      postFix: postfix
    } 
    console.log("________________")
      console.log(postfix)
      console.log("________________")
  
    return ret
  } catch (err) {
    console.log(" err Change  Owner = ", err);
    return await { err: { code: 123, messsage: err } };
  }
}

exports.Authenticate = async (authenticateDTO) => {
  try {
   

    let arr = authenticateDTO.postfix.split('_')
    let newUserID = arr[0]
    let theValidationString = arr[1]

    console.log("____________________")
    console.log("userid",newUserID)
    console.log("validation",theValidationString)
    console.log("____________________")
    const wallet = await conn.db.Wallet.findOne({validationString:theValidationString})
  
    let oldUserID = wallet.userID
   

    await conn.db.Wallet.findOneAndUpdate({_id:wallet._id},{$set:{userID:newUserID},$addToSet:{history:oldUserID}})
    return true
  } catch (err) {
    console.log(" err Change  Owner = ", err);
    return await { err: { code: 123, messsage: err } };
  }
}

