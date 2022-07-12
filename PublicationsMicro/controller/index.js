const express = require("express"),
  router = express.Router(),
  pubs = require("../domain/services/service");
  sub = require("../domain/subscribe/index")
  const multer = require("multer");
  var storage = multer.diskStorage({   
    destination: function(req, file, cb) { 
       cb(null, '../files');    
    }, 
    filename: function (req, file, cb) {
       cb(null , file.originalname);   
    }
 });
 var upload = multer({ storage: storage }).single("postFile");


router.post("/publish",upload, pubs.Publish);
router.get("/getpubs/:UserID", pubs.GetPubs);
router.get("/filfeed/:UserID", pubs.FillFeed);
router.get("/get/:PubID", pubs.GetPub);
router.post("/like", pubs.Like);
router.post("/comment", pubs.Comment);
router.delete("/delete", pubs.Delete);
router.post("/like/comment", pubs.LikeComment);
router.put("/delete/comment", pubs.DeleteComment);
router.get("/data",pubs.TransactionData)
router.get('/explore/:UserID',pubs.Explore)

sub.Kaf()
module.exports = router;
