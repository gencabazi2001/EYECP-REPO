const express = require("express"),
  router = express.Router(),
  magic = require("../util/magic"),
  users = require("../domain/services/service"),
  relations = require("../domain/services/relationService");

router.post("/register", users.Register);
router.get("/get/:UserID", users.GetUser);
router.get("/getAll", users.GetUsers);
router.put("/putDetails", users.AddDetails);
router.put("/putSettings", users.AddSettings);
router.post("/addTag", users.AddTag);
router.post("/login", users.Login);
router.get("/authenticate/:validationString", users.Authenticate);
//user Relation endpoints
router.post("/follow/add", relations.AddFollow);
router.post("/block/add", relations.AddBlock);
//admin endpoints
router.post("/admin/terminate", users.TerminateUser);
router.post("/admin/promote", users.PromoteUser);
router.post("/admin/verifyUser", users.VerifyUser);
module.exports = router;
