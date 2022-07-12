const conn = require("../repositories/repository_mongo");
const dto = require("../DTO/index");
const conn1 = require("../repositories/relations_repository")

exports.RegisterUser = async (msg) => {
  try {
    const usr = await new conn.db.User({
      _id: msg._id,
      username: msg.username,
      isPrivate: msg.isPrivate,
    });
    usr.save();
  } catch (err) {
    console.log(" err Register = ", err);
    return await { err: { code: 123, messsage: err } };
  }
};

exports.GetPostsByFollowing = async (filterUserIDDTO) => {
  try {
    let followPairs = await conn1.db.Follow.find({following:filterUserIDDTO.UserID})
    let publications = []
    for (let i = 0; i < followPairs.length; i++) {
      let pubs = await conn.db.Pub.find({userID:followPairs[i].follower}).sort({ created_at: -1 })
      for (let j = 0; j < pubs.length; j++) {
        publications.push(pubs[j])
      }
    }
    if (publications.length<1) {
      throw "not found"
    }
    return publications
  } catch (err) {
    console.log(" err Register = ", err);
    return await { err: { code: 123, messsage: err } };
  }
};

exports.GetPostsByUser = async (filterUserDTO) => {
  try {
    let user = await conn.db.User.findOne({username:filterUserDTO.Username})
    if (user == null) {
      throw "user not found"
    }
    let pubs = await conn.db.Pub.find({userID:user._id})
    if (pubs.length<1) {
      throw "not found"
    }
    return pubs

  } catch (err) {
    console.log(" err Register = ", err);
    return await { err: { code: 123, messsage: err } };
  }
};

exports.GetPostsByTimeInterval = async (filterTagsDTO) => {
  try {
    let pubs = await conn.db.Pub.find({created_at:{
      $gte: new Date(filterTagsDTO.FromYear, filterTagsDTO.FromMonth, filterTagsDTO.FromDate), 
      $lt: new Date(filterTagsDTO.ToYear, filterTagsDTO.ToMonth, filterTagsDTO.ToDate)
    }})
    if (pubs.length<1) {
      throw "not found"
    }
    return pubs

  } catch (err) {
    console.log(" err Register = ", err);
    return await { err: { code: 123, messsage: err } };
  }
};



exports.GetPostsByTags = async (filterTagsDTO) => {
  try {
    let pubs = await conn.db.Pub.find({tags:{$in:filterTagsDTO.Tags}})
    if (pubs.length<1) {
      throw "not found"
    }
    return pubs

  } catch (err) {
    console.log(" err Register = ", err);
    return await { err: { code: 123, messsage: err } };
  }
};

exports.Publish = async (msg) => {
  try {
    const pub = await new conn.db.Pub({
      _id: msg.id,
      file: msg.image,
      userID: msg.userID,
      tags: msg.tags,
      "location.latitude": msg.lat,
      "location.longitude": msg.long,
    });
    pub.save();
  } catch (err) {
    console.log(" err Register = ", err);
    return await { err: { code: 123, messsage: err } };
  }
};

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

exports.FilterPostsByUser = async (userDTO) => {
  try {
    const user = await new conn.db.User.findOne({username:userDTO.username});
    
  } catch (err) {
    console.log(" err Register = ", err);
    return await { err: { code: 123, messsage: err } };
  }
};
