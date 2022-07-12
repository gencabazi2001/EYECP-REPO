const cron = require("node-cron");
const conn = require("./domain/repositories/repository_mongo");
const pub = require("./domain/publish/kafka");
const axios = require("axios");
const allMoney = 100;
require("dotenv").config();

const sendTransactionDetails = async (id, theValue, likesno) => {
  try {
    let user = await conn.db.User.findOne({ _id: id });
    let mailObj = {
      eventType: "transactionDetails",
      username: user.name,
      email: user.email,
      likes: String(likesno),
      amount: String(theValue),
    };
    console.log(mailObj, process.env.MAIL_TOPIC);
    // await pub.Publish(JSON.stringify(mailObj), process.env.MAIL_TOPIC);
  } catch (err) {
    console.log(err);
  }
};

const makeTransaction = async (id, likesno, allLikes) => {
  try {
    moneyPerLikes = allMoney / allLikes;
    let theValue = moneyPerLikes * likesno;
    let data = new conn.db.Transaction({
      userID: id,
      value: theValue,
      likes: likesno,
      theDate: new Date(Date.now() - 86400000),
    });
    data.save();
    let wallets = await conn.db.Wallet.find({userID:id})
    let walletID = wallets[0]._id
    let wBalance = wallets[0].balance
    wBalance += theValue
    
     let updateBalance = await conn.db.Wallet.updateOne({_id:walletID},{$set:{balance : wBalance}})
     console.log(updateBalance)
    await sendTransactionDetails(id, theValue, likesno);
  } catch (err) {
    console.log(err);
  }
};

cron.schedule("0 2 * * *", () => { 
  let mydata = {};
  console.log("running a task every minute");
  axios
    .get("http://localhost:3001/pub/data")
    .then((res) => {
      mydata = res.data.Resp.data.respOrm;
      let allLikes = 0;
      for (var entry of Object.entries(mydata)) {
        value = entry[1];
        allLikes += value;
      }
      for (var entry of Object.entries(mydata)) {
        var key = entry[0],
          value = entry[1];
        console.log(key + " = " + value);
        makeTransaction(key, value, allLikes);
      }
    })
    .catch((error) => {
      console.error(error);
    });
});
