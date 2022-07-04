const conn = require("../repositories/relationsRepository");
const dto = require("../DTO/index");
const { get } = require("express/lib/response");


exports.AddFollow = async (addFollowDTO) => {
  try {
    const result = await conn.relationdb.Follow.find({
      follower: addFollowDTO.Follower,
      following: addFollowDTO.Following,
    });
    if (result.length == 0) {
      const addFollow = await conn.relationdb.Follow({
        follower: addFollowDTO.Follower,
        following: addFollowDTO.Following,
      });
      addFollow.save();
      return true;
    } else {
      await conn.relationdb.Follow.findOneAndDelete({follower : addFollowDTO.Follower,following:addFollowDTO.Following})
    }
    throw "Failed";
  } catch (err) {
    console.log(" err Add Follow = ", err);
    return await { err: { code: 123, messsage: err } };
  }
};

exports.AddBlock = async (addBlockDTO) => {
  try {
    const result = await conn.relationdb.Block.find({
      blocker: addBlockDTO.Blocker,
      blocked: addBlockDTO.Blocked,
    });
    if (result.length == 0) {
      const addBlock = await conn.relationdb.Block({
        blocker: addBlockDTO.Blocker,
        blocked: addBlockDTO.Blocked,
      });
      addBlock.save();
      await conn.relationdb.Follow.findOneAndDelete({follower : addBlockDTO.Blocker,following:addBlockDTO.Blocked})
      await conn.relationdb.Follow.findOneAndDelete({follower : addBlockDTO.Blocked,following:addBlockDTO.Blocker})
      return true;
    }
    throw "Failed";
  } catch (err) {
    console.log(" err Add Follow = ", err);
    return await { err: { code: 123, messsage: err } };
  }
};
