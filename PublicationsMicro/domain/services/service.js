const magic = require("../../util/magic");
const enum_ = require("../../util/enum");
const ormUser = require("../orm/orm");
const dto = require("../DTO/index");
const pub = require("../publish/kafka");
const { response } = require("express");
const fs = require("fs");

exports.Publish = async (req, res) => {
  let status = "Success",
    errorCode = "",
    message = "",
    data = {},
    statusCode = 0,
    resp = {};
  let respOrm;
  try {
    if (req.file) {
      let filename = req.file.originalname.split(".")[0];
      let extension = req.file.originalname.split(".")[1];
      fs.renameSync(
        req.file.path,
        "../files/" + req.body.UserID + "/" + req.body.UserID + filename  +"." + extension
      );
      req.body.File = req.body.UserID + filename + "." + extension;
    }
    dto.PublishDTO = req.body;
    respOrm = await ormUser.Publish(dto.PublishDTO);
    if (respOrm.err) {
      (status = "Failure"),
        (errorCode = respOrm.err.code),
        (message = respOrm.err.messsage),
        (statusCode = enum_.CODE_BAD_REQUEST);
    } else {
      (message = "Post created"), (statusCode = enum_.CODE_CREATED);
      Object.assign(data, dto.PublishDTO);
      let publishObj = {
        eventType: "publish",
        id: respOrm._id,
        image: respOrm.file,
        userID: respOrm.userID,
        tags: respOrm.tags,
        lat: respOrm.location.latitude,
        long: respOrm.location.longitude,
      };
      await pub.Publish(JSON.stringify(publishObj));


    }
    resp = await magic.ResponseService(status, errorCode, message, data);
    return res.status(statusCode).send(resp);
  } catch (err) {
    console.log("err = ", err);
    return res
      .status(enum_.CODE_INTERNAL_SERVER_ERROR)
      .send(
        await magic.ResponseService("Failure", enum_.CRASH_LOGIC, "err", "")
      );
  }
};

exports.Like = async (req, res) => {
  let status = "Success",
    errorCode = "",
    message = "",
    data = {},
    statusCode = 0,
    resp = {};
  let respOrm;
  try {
    dto.LikeDTO = req.body;
    respOrm = await ormUser.Like(dto.LikeDTO);
    if (respOrm.err) {
      (status = "Failure"),
        (errorCode = respOrm.err.code),
        (message = respOrm.err.messsage),
        (statusCode = enum_.CODE_BAD_REQUEST);
    } else {
      (message = "Like created"), (statusCode = enum_.CODE_CREATED);
      Object.assign(data, dto.LikeDTO);
    }
    resp = await magic.ResponseService(status, errorCode, message, data);
    return res.status(statusCode).send(resp);
  } catch (err) {
    console.log("err = ", err);
    return res
      .status(enum_.CODE_INTERNAL_SERVER_ERROR)
      .send(
        await magic.ResponseService("Failure", enum_.CRASH_LOGIC, "err", "")
      );
  }
};

exports.LikeComment = async (req, res) => {
  let status = "Success",
    errorCode = "",
    message = "",
    data = {},
    statusCode = 0,
    resp = {};
  let respOrm;
  try {
    dto.LikeCommentDTO = req.body;
    respOrm = await ormUser.LikeComment(dto.LikeCommentDTO);
    if (respOrm.err) {
      (status = "Failure"),
        (errorCode = respOrm.err.code),
        (message = respOrm.err.messsage),
        (statusCode = enum_.CODE_BAD_REQUEST);
    } else {
      (message = "Like created"), (statusCode = enum_.CODE_CREATED);
      Object.assign(data, dto.LikeDTO);
    }
    resp = await magic.ResponseService(status, errorCode, message, data);
    return res.status(statusCode).send(resp);
  } catch (err) {
    console.log("err = ", err);
    return res
      .status(enum_.CODE_INTERNAL_SERVER_ERROR)
      .send(
        await magic.ResponseService("Failure", enum_.CRASH_LOGIC, "err", "")
      );
  }
};

exports.Comment = async (req, res) => {
  let status = "Success",
    errorCode = "",
    message = "",
    data = {},
    statusCode = 0,
    resp = {};
  let respOrm;
  try {
    dto.CommentDTO = req.body;
    respOrm = await ormUser.Comment(dto.CommentDTO);
    if (respOrm.err) {
      (status = "Failure"),
        (errorCode = respOrm.err.code),
        (message = respOrm.err.messsage),
        (statusCode = enum_.CODE_BAD_REQUEST);
    } else {
      (message = "Comment created"), (statusCode = enum_.CODE_CREATED);
      Object.assign(data, dto.CommentDTO);
    }
    resp = await magic.ResponseService(status, errorCode, message, data);
    return res.status(statusCode).send(resp);
  } catch (err) {
    console.log("err = ", err);
    return res
      .status(enum_.CODE_INTERNAL_SERVER_ERROR)
      .send(
        await magic.ResponseService("Failure", enum_.CRASH_LOGIC, "err", "")
      );
  }
};

exports.Delete = async (req, res) => {
  let status = "Success",
    errorCode = "",
    message = "",
    data = {},
    statusCode = 0,
    resp = {};
  let respOrm;
  try {
    dto.PubIDDTO = req.body;
    respOrm = await ormUser.Delete(dto.PubIDDTO);
    if (respOrm.err) {
      (status = "Failure"),
        (errorCode = respOrm.err.code),
        (message = respOrm.err.messsage),
        (statusCode = enum_.CODE_BAD_REQUEST);
    } else {
      (message = "Post Deleted"), (statusCode = enum_.CODE_ACCEPTED);
      Object.assign(data, dto.PubIDDTO);
    }
    resp = await magic.ResponseService(status, errorCode, message, data);
    return res.status(statusCode).send(resp);
  } catch (err) {
    console.log("err = ", err);
    return res
      .status(enum_.CODE_INTERNAL_SERVER_ERROR)
      .send(
        await magic.ResponseService("Failure", enum_.CRASH_LOGIC, "err", "")
      );
  }
};

exports.GetPubs = async (req, res) => {
  let status = "Success",
    errorCode = "",
    message = "",
    data = {},
    statusCode = 0,
    resp = {};
  let respOrm;
  try {
    dto.UserIDDTO = req.params;
    respOrm = await ormUser.GetPubsByID(dto.UserIDDTO);
    if (respOrm.err) {
      (status = "Failure"),
        (errorCode = respOrm.err.code),
        (message = respOrm.err.messsage),
        (statusCode = enum_.CODE_BAD_REQUEST);
    } else {
      (message = "Got Posts"), (statusCode = enum_.CODE_ACCEPTED);
      Object.assign(data, { respOrm });
    }
    resp = await magic.ResponseService(status, errorCode, message, data);
    return res.status(statusCode).send(resp);
  } catch (err) {
    console.log("err = ", err);
    return res
      .status(enum_.CODE_INTERNAL_SERVER_ERROR)
      .send(
        await magic.ResponseService("Failure", enum_.CRASH_LOGIC, "err", "")
      );
  }
};

exports.GetPub = async (req, res) => {
  let status = "Success",
    errorCode = "",
    message = "",
    data = {},
    statusCode = 0,
    resp = {};
  let respOrm;
  try {
    dto.PubIDDTO = req.params;
    respOrm = await ormUser.GetPub(dto.PubIDDTO);
    if (respOrm.err) {
      (status = "Failure"),
        (errorCode = respOrm.err.code),
        (message = respOrm.err.messsage),
        (statusCode = enum_.CODE_BAD_REQUEST);
    } else {
      (message = "Got Posts"), (statusCode = enum_.CODE_ACCEPTED);
      Object.assign(data, { respOrm });
    }
    resp = await magic.ResponseService(status, errorCode, message, data);
    return res.status(statusCode).send(resp);
  } catch (err) {
    console.log("err = ", err);
    return res
      .status(enum_.CODE_INTERNAL_SERVER_ERROR)
      .send(
        await magic.ResponseService("Failure", enum_.CRASH_LOGIC, "err", "")
      );
  }
};

exports.DeleteComment = async (req, res) => {
  let status = "Success",
    errorCode = "",
    message = "",
    data = {},
    statusCode = 0,
    resp = {};
  let respOrm;
  try {
    dto.CommentDTO = req.body;
    respOrm = await ormUser.DeleteComment(dto.CommentDTO);
    if (respOrm.err) {
      (status = "Failure"),
        (errorCode = respOrm.err.code),
        (message = respOrm.err.messsage),
        (statusCode = enum_.CODE_BAD_REQUEST);
    } else {
      (message = "Comment created"), (statusCode = enum_.CODE_CREATED);
      Object.assign(data, dto.CommentDTO);
    }
    resp = await magic.ResponseService(status, errorCode, message, data);
    return res.status(statusCode).send(resp);
  } catch (err) {
    console.log("err = ", err);
    return res
      .status(enum_.CODE_INTERNAL_SERVER_ERROR)
      .send(
        await magic.ResponseService("Failure", enum_.CRASH_LOGIC, "err", "")
      );
  }
};

exports.FillFeed = async (req, res) => {
  let status = "Success",
    errorCode = "",
    message = "",
    data = {},
    statusCode = 0,
    resp = {};
  let respOrm;
  try {
    dto.UserIDDTO = req.params;
    respOrm = await ormUser.FillFeed(dto.UserIDDTO);
    if (respOrm.err) {
      (status = "Failure"),
        (errorCode = respOrm.err.code),
        (message = respOrm.err.messsage),
        (statusCode = enum_.CODE_BAD_REQUEST);
    } else {
      (message = "Got Posts"), (statusCode = enum_.CODE_ACCEPTED);
      Object.assign(data, { respOrm });
    }
    resp = await magic.ResponseService(status, errorCode, message, data);
    return res.status(statusCode).send(resp);
  } catch (err) {
    console.log("err = ", err);
    return res
      .status(enum_.CODE_INTERNAL_SERVER_ERROR)
      .send(
        await magic.ResponseService("Failure", enum_.CRASH_LOGIC, "err", "")
      );
  }
};

exports.TransactionData = async (req, res) => {
  let status = "Success",
    errorCode = "",
    message = "",
    data = {},
    statusCode = 0,
    resp = {};
  let respOrm;
  try {
    respOrm = await ormUser.TransactionData();
    if (respOrm.err) {
      (status = "Failure"),
        (errorCode = respOrm.err.code),
        (message = respOrm.err.messsage),
        (statusCode = enum_.CODE_BAD_REQUEST);
    } else {
      (message = "Got Posts"), (statusCode = enum_.CODE_ACCEPTED);
      Object.assign(data, { respOrm });
    }
    resp = await magic.ResponseService(status, errorCode, message, data);
    return res.status(statusCode).send(resp);
  } catch (err) {
    console.log("err = ", err);
    return res
      .status(enum_.CODE_INTERNAL_SERVER_ERROR)
      .send(
        await magic.ResponseService("Failure", enum_.CRASH_LOGIC, "err", "")
      );
  }
};
