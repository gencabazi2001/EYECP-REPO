const express = require("express"),
  router = express.Router(),
  magic = require("../util/magic"),
  wallet = require("../domain/services/service")
  sub = require("../domain/subscribe/index")

  
  router.post("/create",wallet.CreateWallet)
  router.get("/get/:UserID",wallet.GetWallets)
  router.post("/changeOwner",wallet.ChangeOwner)
  router.get("/authenticate/:postfix",wallet.Authenticate)
  router.get("/transaction/get/:UserID",wallet.GetTransactions)
  router.put("/deleteWallet",wallet.DeleteWallet)
  sub.Kaf()
module.exports = router;