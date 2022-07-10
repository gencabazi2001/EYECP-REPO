const connUser = require("../repositories/repository_mongo");
const dto = require("../DTO/index");
const crypto = require("crypto");

exports.Authenticate = async (validationDTO) => {
  try {
    const user = await connUser.db.User.findOne({
      validationString: validationDTO.validationString,
    });

    if (user) {
      let update = await connUser.db.User.updateOne(
        { _id: user._id },
        { $set: { validationString: null } }
      );
      if (update.modifiedCount == 1) {
        return true;
      }
    }
    throw "Not registered";
  } catch (err) {
    console.log(" err Authenticate = ", err);
    return await { err: { code: 123, messsage: err } };
  }
};

exports.Login = async (email) => {
  try {
    const user = await connUser.db.User.findOne({ email: email });

    if (user) {
      dto.LoginReturnDTO.Password = user.password;
      dto.LoginReturnDTO.ID = user._id;
      dto.LoginReturnDTO.Email = user.email;
      dto.LoginReturnDTO.Name = user.name;
      return dto.LoginReturnDTO;
    }
    throw "Not registered";
  } catch (err) {
    console.log(" err Login = ", err);
    return await { err: { code: 123, messsage: err } };
  }
};

exports.Register = async (registerDTO) => {
  try {
    const validation = crypto.randomBytes(16).toString("hex");

    const datacenter = await new connUser.db.User({
      name: registerDTO.Name,
      username: registerDTO.Username,
      email: registerDTO.Email,
      password: registerDTO.Password,
      dob: registerDTO.DOB,
      active: false,
      validationString: validation,
      verified: false,
    });
    const exists = await connUser.db.User.findOne({ email: registerDTO.Email });
    if (exists) {
      throw "User already exists";
    }
    let created = await datacenter.save();
    return created;
  } catch (err) {
    console.log(" err Register = ", err);
    return await { err: { code: 123, messsage: err } };
  }
};
exports.GetUsers = async () => {
  try {
    console.log("reached orm")
    const result = await connUser.db.User.find();
    let returnDTO = {};
    let returnDTOs = [];
    if (result) {
      result.forEach((element) => {
        returnDTO.Name = element.name;
        returnDTO.Email = element.email;
        if (element.dob != null) {
          returnDTO.DOB = element.dob + "";
        } else {
          returnDTO.DOB = "";
        }
        returnDTO.Username = element.username;
        returnDTO.Verified = element.verified;
        returnDTO.Settings = element.settings;
        returnDTO.Tags = element.tags;
        returnDTO.Details = element.details;
        returnDTOs.push(returnDTO);
        returnDTO = {};
      });
      return returnDTOs;
    }

    throw "User not found";
  } catch (err) {
    console.log(" err GetUser = ", err);
    return await { err: { code: 123, messsage: err } };
  }
};

exports.GetUser = async (getUserDTO) => {
  try {
    const result = await connUser.db.User.find({ _id: getUserDTO.UserID });
    if (result.length > 0) {
      let myResult = result[0];
      dto.ReturnUserDTO.Name = myResult.name;
      dto.ReturnUserDTO.Email = myResult.email;
      dto.ReturnUserDTO.DOB = myResult.dob;
      dto.ReturnUserDTO.Username = myResult.username;
      dto.ReturnUserDTO.Verified = myResult.verified;
      dto.ReturnUserDTO.Settings = myResult.settings;
      dto.ReturnUserDTO.Tags = myResult.tags;
      dto.ReturnUserDTO.Details = myResult.details;

      return dto.ReturnUserDTO;
    }
    throw "User not found";
  } catch (err) {
    console.log(" err GetUser = ", err);
    return await { err: { code: 123, messsage: err } };
  }
};

exports.AddDetails = async (addDetailsDTO) => {
  try {
    const filter = { _id: addDetailsDTO.UserID };
    const update = {
      profileImage: addDetailsDTO.ProfileImage,
      backgroundImage: addDetailsDTO.BackgroundImage,
      bio: addDetailsDTO.Bio,
      url: addDetailsDTO.Url,
    };
    let doc = await connUser.db.User.updateOne(
      filter,
      { $set: { details: update } },
      {
        multi: true,
      }
    );
    if (doc.modifiedCount == 1) {
      let theUser = await connUser.db.User.findOne(filter);
      return theUser;
    }
    throw "User not found";
  } catch (err) {
    console.log(" err Update User Details = ", err);
    return await { err: { code: 123, messsage: err } };
  }
};

exports.AddSettings = async (addSettingsDTO) => {
  try {
    const filter = { _id: addSettingsDTO.UserID };
    const update = {
      darkMode: addSettingsDTO.DarkMode,
      isPrivate: addSettingsDTO.IsPrivate,
    };
    let doc = await connUser.db.User.updateOne(
      filter,
      { $set: { settings: update } },
      {
        multi: true,
      }
    );
    if (doc.modifiedCount == 1) {
      let theUser = await connUser.db.User.findOne(filter);
      return theUser;
    }
    throw "User not found";
  } catch (err) {
    console.log(" err Update User Details = ", err);
    return await { err: { code: 123, messsage: err } };
  }
};

exports.AddTag = async (addPreferenceDTO) => {
  try {
    const tagResult = await connUser.db.Tag.find({ tag: addPreferenceDTO.Tag });
    if (tagResult.length == 0) {
      const addTag = await connUser.db.Tag({
        tag: addPreferenceDTO.Tag,
        desc: addPreferenceDTO.TagDesc,
      });
      addTag.save();
    }
    const filter = { _id: addPreferenceDTO.UserID };
    let doc = await connUser.db.User.updateOne(filter, {
      $addToSet: { tags: addPreferenceDTO.Tag },
    });
    if (doc.modifiedCount == 1) {
      return true;
    }
    throw "Failed";
  } catch (err) {
    console.log(" err Add Tag = ", err);
    return await { err: { code: 123, messsage: err } };
  }
};

exports.PromoteUser = async (promoteUserDTO) => {
  try {
    let err = "";
    const admin = await connUser.db.Admin.find({
      userID: promoteUserDTO.UserID,
    });
    if (admin != null) {
      const user = await connUser.db.User.findOne({
        _id: promoteUserDTO.UserID,
      });
      if (user) {
        const storeAdmin = await connUser.db.Admin({
          userID: user._id,
          name: user.name,
          username: user.username,
          email: user.email,
          password: user.password,
          dob: user.dob,
        });
        storeAdmin.save();
        return true;
      }
      throw (err = "User doesn't exists in our db");
    }
    err = "User is Already an admin";
    throw err;
  } catch (err) {
    console.log(" err Promote = ", err);
    return await { err: { code: 123, messsage: err } };
  }
};

exports.TerminateUser = async (terminateUserDTO) => {
  try {
    let err = "";
    const admin = await connUser.db.Admin.findOne({
      _id: terminateUserDTO.AdminID,
    });
    if (admin != null && admin != undefined) {
      const user = await connUser.db.User.findOne({
        _id: terminateUserDTO.UserID,
      });
      const isAdmin = await connUser.db.Admin.findOne({
        userID: terminateUserDTO.UserID,
      });
      if (user && !isAdmin) {
        const filter = { _id: terminateUserDTO.UserID };
        let doc = await connUser.db.User.findOneAndUpdate(filter, {
          $set: { email: "", name: "", username: "", password: "", dob: "" },
        });
        return true;
      }
      throw (err = "user does not exist or is an admin");
    }
    err = "you are not an admin";
    throw err;
  } catch (err) {
    console.log(" err Terminate = ", err);
    return await { err: { code: 123, messsage: err } };
  }
};

exports.VerifyUser = async (verifyUserDTO) => {
  try {
    const filter = { _id: verifyUserDTO.UserID };
    let doc = await connUser.db.User.findOneAndUpdate(filter, {
      $set: { verified: true },
    });
    if (doc != null) {
      return true;
    } else {
      throw (err = "Couldn't update");
    }
  } catch (err) {
    console.log(" err Verify = ", err);
    return await { err: { code: 123, messsage: err } };
  }
};
