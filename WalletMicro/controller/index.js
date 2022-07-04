const express = require("express"),
  router = express.Router(),
  magic = require("../util/magic"),
  wallet = require("../domain/services/service")
  sub = require("../domain/subscribe/index")


  router.post("/wallet/create",wallet.CreateWallet)
  router.get("/wallet/get/:UserID",wallet.GetWallets)
  router.post("/wallet/changeOwner",wallet.ChangeOwner)
  router.get("/wallet/authenticate/:postfix",wallet.Authenticate)
  sub.Kaf()
module.exports = router;