const conn = require("../repositories/repository_mongo");
const dto = require("../DTO/index");

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
