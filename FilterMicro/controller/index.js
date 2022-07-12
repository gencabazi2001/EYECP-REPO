const express = require("express"),
  router = express.Router(),
  magic = require("../util/magic"),
  users = require("../domain/services/service");
  // relations = require("../domain/services/relationService");
  sub = require("../domain/subscribe/index")

  router.get('/tags', users.GetPostsByTags)
  router.get('/by/user', users.GetPostsByUser)
  router.get('/time', users.GetPostsByTime)
  router.get('/following',users.GetPostsByFollowing)
  
  sub.Kaf()
module.exports = router;
