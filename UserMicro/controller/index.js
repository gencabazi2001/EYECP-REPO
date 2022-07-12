const express = require("express"),
  router = express.Router(),
  magic = require("../util/magic"),
  users = require("../domain/services/service"),
  relations = require("../domain/services/relationService");
  const multer = require("multer");
  var storage = multer.diskStorage({   
    destination: function(req, file, cb) { 
       cb(null, '../files');    
    }, 
    filename: function (req, file, cb) {
      console.log("______file____")
      console.log(file)
       cb(null , file.originalname);   
    }
 });
 var upload = multer({ storage: storage }).single("profileImage");
 

router.post("/register", users.Register);
router.get("/get/:UserID", users.GetUser);
router.get("/getAll", users.GetUsers);
router.put("/putDetails",upload,users.AddDetails);
router.put("/putSettings", users.AddSettings);
router.post("/addTag", users.AddTag);
router.post("/login", users.Login);
router.get("/authenticate/:validationString", users.Authenticate);
router.post("/extract",users.Extract)
//user Relation endpoints
router.post("/follow/add", relations.AddFollow);
router.post("/block/add", relations.AddBlock);
//admin endpoints
router.post("/admin/terminate", users.TerminateUser);
router.post("/admin/promote", users.PromoteUser);
router.post("/admin/verifyUser", users.VerifyUser);
module.exports = router;
