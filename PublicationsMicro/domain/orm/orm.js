const conn = require("../repositories/repository_mongo");
const conn1 = require("../repositories/tagRepository");
const dto = require("../DTO/index");
const redis = require("redis");
const client = redis.createClient("redis://127.0.0.1:6379");

client.on("error", (err) => console.log("Redis Client Error", err));

client.connect();

exports.UpdatePic = async (msg) => {
  try {
    let filter = { _id: msg.userID };
    await conn.db.User.updateOne(filter, {
      $set: { profileImage: msg.profileImage },
    });
  } catch (err) {}
};

exports.UpdatePrivate = async (msg) => {
  try {
    let filter = { _id: msg.userID };
    await conn.db.User.updateOne(filter, {
      $set: { isPrivate: msg.isPrivate },
    });
  } catch (err) {}
};

exports.RegisterUser = async (msg) => {
  try {
    const usr = await new conn.db.User({
      _id: msg._id,
      username: msg.username,
      isPrivate: msg.isPrivate,
    });
    usr.save();
  } catch (err) {}
};
exports.Publish = async (publishDTO) => {
  try {
    await AddTags(publishDTO.Tags);
    const publish = await new conn.db.Pub({
      caption: publishDTO.Caption,
      file: publishDTO.File,
      userID: publishDTO.UserID,
      tags: publishDTO.Tags,
      location: {
        latitude: publishDTO.Latitude,
        longitude: publishDTO.Longitude,
      },
    });
    let created = await publish.save();
    return created;
  } catch (err) {
    console.log(" err Register = ", err);
    return await { err: { code: 123, messsage: err } };
  }
};

exports.Like = async (likeDTO) => {
  try {
    const filter = { _id: likeDTO.PubID };
    const post = await conn.db.Pub.findOne(filter);
    let myLikes = post.likes;
    let found = false;
    for (var i = 0; i < myLikes.length; i++) {
      if (myLikes[i].userID === likeDTO.UserID) {
        myLikes.splice(i, 1);
        i--;
        found = true;
      }
    }
    if (found) {
      await conn.db.Pub.updateOne(filter, {
        $set: { likes: myLikes },
      });
      return true;
    }
    const pub = await conn.db.Pub.updateOne(filter, {
      $addToSet: { likes: { userID: likeDTO.UserID } },
    });
    if (pub.modifiedCount == 1) {
      return true;
    } else {
      throw (err = "couldn't make like");
    }
  } catch (err) {
    console.log(" err Register = ", err);
    return await { err: { code: 123, messsage: err } };
  }
};

exports.LikeComment = async (likeCommentDTO) => {
  try {
    const filter = { _id: likeCommentDTO.PubID };
    const post = await conn.db.Pub.findOne(filter);
    let myComments = post.comments;
    let found = false;

    for (var i = 0; i < myComments.length; i++) {
      if (myComments[i]._id == likeCommentDTO.CommentID) {
        let myLikes = myComments[i].likes;

        for (var i = 0; i < myLikes.length; i++) {
          if (myLikes[i].userID === likeCommentDTO.UserID) {
            myLikes.splice(i, 1);
            i--;
            found = true;
          }
        }
        if (found) {
          await conn.db.Pub.findOneAndUpdate(
            { "comments._id": likeCommentDTO.CommentID },
            { $set: { "comments.$.likes": myLikes } }
          );
          return true;
        } else {
          await conn.db.Pub.findOneAndUpdate(
            { "comments._id": likeCommentDTO.CommentID },
            {
              $addToSet: {
                "comments.$.likes": { userID: likeCommentDTO.UserID },
              },
            }
          );
          return true;
        }
      }
    }
  } catch (err) {
    console.log(" err Register = ", err);
    return await { err: { code: 123, messsage: err } };
  }
};

exports.TransactionData = async () => {
  try {
    let userIDs = await conn.db.User.find({});
    const map = new Map();
    for (let i = 0; i < userIDs.length; i++) {
      let pubs = await conn.db.Pub.find({ userID: userIDs[i]._id });

      let userlikes = 0;
      for (let i = 0; i < pubs.length; i++) {
        pubs[i].likes.forEach((like, i) => {
          //Date.now() - 86400000
          if (
            like.created_at.toISOString().split("T")[0] ==
            new Date().toISOString().split("T")[0]
          ) {
            userlikes++;
          }
        });
      }
      if (userlikes != 0) {
        map.set(userIDs[i]._id.toString(), userlikes);
      }
    }
    if (userIDs.length == 0) {
      throw "no data";
    } else {
      const obj = Object.fromEntries(map);
      return obj;
    }
  } catch (err) {
    console.log(" err Register = ", err);
    return await { err: { code: 123, messsage: err } };
  }
};

exports.Comment = async (commentDTO) => {
  try {
    const filter = { _id: commentDTO.PubID };
    const pub = await conn.db.Pub.updateOne(filter, {
      $addToSet: {
        comments: { userID: commentDTO.UserID, comment: commentDTO.Comment },
      },
    });
    if (pub.modifiedCount == 1) {
      return true;
    } else {
      throw (err = "couldn't make comment");
    }
  } catch (err) {
    console.log(" err Register = ", err);
    return await { err: { code: 123, messsage: err } };
  }
};

exports.DeleteComment = async (commentDTO) => {
  try {
    const filter = { _id: commentDTO.PubID };
    const pub = await conn.db.Pub.update(filter, {
      $pull: {
        comments: { _id: commentDTO.CommentID },
      },
    });
    if (pub.modifiedCount == 1) {
      return true;
    } else {
      throw (err = "couldn't delete comment");
    }
  } catch (err) {
    console.log(" err Register = ", err);
    return await { err: { code: 123, messsage: err } };
  }
};

exports.Delete = async (pubIDDTO) => {
  try {
    const pub = await conn.db.Pub.deleteOne({ _id: pubIDDTO.PubID });
    if (pub.deletedCount == 1) {
      return true;
    } else {
      throw (err = "couldn't make comment");
    }
  } catch (err) {
    console.log(" err Register = ", err);
    return await { err: { code: 123, messsage: err } };
  }
};

exports.GetPubsByID = async (userIDDTO) => {
  try {
    const pubs = await conn.db.Pub.find({ userID: userIDDTO.UserID });
    if (pubs.length < 1) {
      throw "no publications from this userID: " + userIDDTO.UserID;
    }
    let fullposts = [];
    let usr = await conn.db.User.findOne({ _id: userIDDTO.UserID });
    for (let i = 0; i < pubs.length; i++) {
      let fullcomments = [];
      for (let j = 0; j < pubs[i].comments.length; j++) {
        let usr = await conn.db.User.findOne({
          _id: pubs[i].comments[j].userID,
        });
        let fullcomment = {
          comment: pubs[i].comments[j],
          user: usr,
        };
        fullcomments.push(fullcomment);
      }
      let fullpost = {
        post: pubs[i],
        user: usr,
        comments: fullcomments,
      };
      fullposts.push(fullpost);
    }
    return fullposts;
  } catch (err) {
    console.log(" err Register = ", err);
    return await { err: { code: 123, messsage: err } };
  }
};

exports.GetPub = async (pubIDDTO) => {
  try {
    let redisPub = await client.get(pubIDDTO.PubID);
    if (redisPub == null) {
      const pub = await conn.db.Pub.findOne({ _id: pubIDDTO.PubID });
      if (pub == null) {
        throw "publication doesn't exist";
      }
      await client.set(`${pub._id}`, JSON.stringify(pub));
      return pub;
    } else {
      return JSON.parse(redisPub);
    }
  } catch (err) {
    console.log(" err Register = ", err);
    return await { err: { code: 123, messsage: err } };
  }
};

const checkFollow = async (myid, checkid) => {
  let myFollows = await conn1.db.Follow.find({following:myid})

  found = false
  for (let i = 0; i < myFollows.length; i++) {
    if (myFollows[i].follower == checkid) {
      found = true
    }
  }
  return found

}

exports.Explore = async (userIDDTO) => {
  try {
    let pubs = await conn.db.Pub.find().sort({ created_at: -1 }).limit(50);
    if (pubs.length < 1) {
      throw "no publications from this userID: " + userIDDTO.UserID;
    }
    let fullposts = [];
   


    for (let i = 0; i < pubs.length; i++) {
      if (pubs[i].userID == userIDDTO.UserID){
        continue;
      }
      let found = await checkFollow(userIDDTO.UserID,pubs[i].userID)
      if (found){
        continue;
      }
      let fullcomments = [];
      let postUser = await conn.db.User.findOne({ _id: pubs[i].userID });
      for (let j = 0; j < pubs[i].comments.length; j++) {
        let usr = await conn.db.User.findOne({
          _id: pubs[i].comments[j].userID,
        });
        let fullcomment = {
          comment: pubs[i].comments[j],
          user: usr,
        };
        fullcomments.push(fullcomment);
      }
      let fullpost = {
        post: pubs[i],
        user: postUser,
        comments: fullcomments,
      };
      fullposts.push(fullpost);
    }
    return fullposts;
  } catch (err) {
    console.log(" err Register = ", err);
    return await { err: { code: 123, messsage: err } };
  }
};

exports.FillFeed = async (userIDDTO) => {
  try {
    const res = await conn1.db.Follow.find({ follower: userIDDTO.UserID });
    let postArray = [];

    for (var i = 0; i < res.length; i++) {
      let thepost = await conn.db.Pub.findOne({
        userID: res[i].following,
      }).sort({ created_at: -1 });
      if (thepost != null) {
        postArray.push(thepost);
      }
    }

    let fullposts = [];

    for (let i = 0; i < postArray.length; i++) {
      let fullcomments = [];
      let postUser = await conn.db.User.findOne({ _id: postArray[i].userID });
      for (let j = 0; j < postArray[i].comments.length; j++) {
        let usr = await conn.db.User.findOne({
          _id: postArray[i].comments[j].userID,
        });
        let fullcomment = {
          comment: postArray[i].comments[j],
          user: usr,
        };
        fullcomments.push(fullcomment);
      }
      let fullpost = {
        post: postArray[i],
        user: postUser,
        comments: fullcomments,
      };
      fullposts.push(fullpost);
    }
    return fullposts;
  } catch (err) {
    console.log(" err Register = ", err);
    return await { err: { code: 123, messsage: err } };
  }
};

AddTags = async (tags) => {
  try {
    for (var i = 0; i < tags.length; i++) {
      let theTag = await conn1.db.Tag.findOne({ tag: tags[i] });
      if (theTag == null) {
        let newTag = await new conn1.db.Tag({
          tag: tags[i],
        });
        newTag.save();
      }
    }
  } catch (err) {
    console.log(" err Add Tag = ", err);
    return await { err: { code: 123, messsage: err } };
  }
};
