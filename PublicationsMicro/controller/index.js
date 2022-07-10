const express = require("express"),
  router = express.Router(),
  pubs = require("../domain/services/service");
  sub = require("../domain/subscribe/index")
router.post("/publish", pubs.Publish);
router.get("/getpubs/:UserID", pubs.GetPubs);
router.get("/filfeed/:UserID", pubs.FillFeed);
router.get("/get/:PubID", pubs.GetPub);
router.post("/like", pubs.Like);
router.post("/comment", pubs.Comment);
router.delete("/delete", pubs.Delete);
router.post("/like/comment", pubs.LikeComment);
router.put("/delete/comment", pubs.DeleteComment);
router.get("/data",pubs.TransactionData)

sub.Kaf()
module.exports = router;
