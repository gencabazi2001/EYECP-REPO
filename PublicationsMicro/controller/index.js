const express = require("express"),
  router = express.Router(),
  pubs = require("../domain/services/service");
  sub = require("../domain/subscribe/index")
router.post("/publish", pubs.Publish);
router.get("/publications/:UserID", pubs.GetPubs);
router.get("/filfeed/:UserID", pubs.FillFeed);
router.get("/publications/get/:PubID", pubs.GetPub);
router.post("/publish/like", pubs.Like);
router.post("/publish/comment", pubs.Comment);
router.delete("/publish/delete", pubs.Delete);
router.post("/publish/like/comment", pubs.LikeComment);
router.put("/publish/delete/comment", pubs.DeleteComment);

sub.Kaf()
module.exports = router;
