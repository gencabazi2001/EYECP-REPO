const magic = require("../../util/magic");
const enum_ = require("../../util/enum");
const orm = require("../orm/orm");
const dto = require("../DTO/index");


exports.GetPostsByTags = async (req,res) => {
  let status = "Success",
    errorCode = "",
    message = "",
    data = {},
    statusCode = 0,
    resp = {};
  let respOrm;
  try {
    dto.FilterTagsDTO = req.body;
    respOrm = await orm.GetPostsByTags(dto.FilterTagsDTO);
    if (respOrm.err) {
      (status = "Failure"),
        (errorCode = respOrm.err.code),
        (message = respOrm.err.messsage),
        (statusCode = enum_.CODE_BAD_REQUEST);
    } else {
      (message = "Got Posts"), (statusCode = enum_.CODE_CREATED);
      Object.assign(data, {respOrm});
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
}


exports.GetPostsByUser = async (req,res) => {
  let status = "Success",
    errorCode = "",
    message = "",
    data = {},
    statusCode = 0,
    resp = {};
  let respOrm;
  try {
    dto.FilterUserDTO = req.body;
    respOrm = await orm.GetPostsByUser(dto.FilterUserDTO);
    if (respOrm.err) {
      (status = "Failure"),
        (errorCode = respOrm.err.code),
        (message = respOrm.err.messsage),
        (statusCode = enum_.CODE_BAD_REQUEST);
    } else {
      (message = "Got Posts"), (statusCode = enum_.CODE_CREATED);
      Object.assign(data, {respOrm});
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
}


exports.GetPostsByTime = async (req,res) => {
  let status = "Success",
    errorCode = "",
    message = "",
    data = {},
    statusCode = 0,
    resp = {};
  let respOrm;
  try {
    dto.FilterDateDTO = req.body;
    respOrm = await orm.GetPostsByTimeInterval(dto.FilterDateDTO);
    if (respOrm.err) {
      (status = "Failure"),
        (errorCode = respOrm.err.code),
        (message = respOrm.err.messsage),
        (statusCode = enum_.CODE_BAD_REQUEST);
    } else {
      (message = "Got Posts"), (statusCode = enum_.CODE_CREATED);
      Object.assign(data, {respOrm});
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
}
exports.GetPostsByFollowing = async (req,res) => {
  let status = "Success",
    errorCode = "",
    message = "",
    data = {},
    statusCode = 0,
    resp = {};
  let respOrm;
  try {
    dto.FilterUserIDDTO = req.body;
    respOrm = await orm.GetPostsByFollowing(dto.FilterUserIDDTO);
    if (respOrm.err) {
      (status = "Failure"),
        (errorCode = respOrm.err.code),
        (message = respOrm.err.messsage),
        (statusCode = enum_.CODE_BAD_REQUEST);
    } else {
      (message = "Got Posts"), (statusCode = enum_.CODE_CREATED);
      Object.assign(data, {respOrm});
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
}
exports.Explore = async (req,res) => {
  let status = "Success",
    errorCode = "",
    message = "",
    data = {},
    statusCode = 0,
    resp = {};
  let respOrm;
  try {
    respOrm = await orm.Explore();
    if (respOrm.err) {
      (status = "Failure"),
        (errorCode = respOrm.err.code),
        (message = respOrm.err.messsage),
        (statusCode = enum_.CODE_BAD_REQUEST);
    } else {
      (message = "Got Posts"), (statusCode = enum_.CODE_CREATED);
      Object.assign(data, {respOrm});
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
}