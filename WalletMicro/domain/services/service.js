const magic = require("../../util/magic");
const enum_ = require("../../util/enum");
const orm = require("../orm/orm");
const dto = require("../DTO/index");
const { response } = require("express");
const pub = require("../publish/kafka");


exports.CreateWallet = async (req,res) => {
  let status = "Success",
    errorCode = "",
    message = "",
    data = {},
    statusCode = 0,
    resp = {};
  let respOrm;
  try {
    dto.CreateWalletDTO = req.body;
    respOrm = await orm.CreateWallet(dto.CreateWalletDTO);
    if (respOrm.err) {
      (status = "Failure"),
        (errorCode = respOrm.err.code),
        (message = respOrm.err.messsage),
        (statusCode = enum_.CODE_BAD_REQUEST);
    } else {
      (message = "Wallet created"), (statusCode = enum_.CODE_CREATED);
      Object.assign(data, dto.CreateWalletDTO);
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

exports.GetWallets = async (req,res) => {
  let status = "Success",
    errorCode = "",
    message = "",
    data = {},
    statusCode = 0,
    resp = {};
  let respOrm;
  try {
    dto.GetWalletsDTO = req.params;
    respOrm = await orm.GetWallets(dto.GetWalletsDTO);
    if (respOrm.err) {
      (status = "Failure"),
        (errorCode = respOrm.err.code),
        (message = respOrm.err.messsage),
        (statusCode = enum_.CODE_BAD_REQUEST);
    } else {
      (message = "Got Wallets"), (statusCode = enum_.CODE_CREATED);
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

exports.DeleteWallet = async (req,res) => {
  let status = "Success",
    errorCode = "",
    message = "",
    data = {},
    statusCode = 0,
    resp = {};
  let respOrm;
  try {
    dto.DeleteWalletDTO = req.body;
    respOrm = await orm.DeleteWallet(dto.DeleteWalletDTO);
    if (respOrm.err) {
      (status = "Failure"),
        (errorCode = respOrm.err.code),
        (message = respOrm.err.messsage),
        (statusCode = enum_.CODE_BAD_REQUEST);
    } else {
      (message = "Wallet Deleted"), (statusCode = enum_.CODE_CREATED);
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

exports.GetTransactions = async (req,res) => {
  let status = "Success",
    errorCode = "",
    message = "",
    data = {},
    statusCode = 0,
    resp = {};
  let respOrm;
  try {
    dto.GetWalletsDTO = req.params;
    respOrm = await orm.GetTransactions(dto.GetWalletsDTO);
    if (respOrm.err) {
      (status = "Failure"),
        (errorCode = respOrm.err.code),
        (message = respOrm.err.messsage),
        (statusCode = enum_.CODE_BAD_REQUEST);
    } else {
      (message = "Got Transactions"), (statusCode = enum_.CODE_CREATED);
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

exports.ChangeOwner = async (req,res) => {
  let status = "Success",
    errorCode = "",
    message = "",
    data = {},
    statusCode = 0,
    resp = {};
  let respOrm;
  try {
    dto.ChangeOwnerDTO = req.body;
    respOrm = await orm.ChangeOwner(dto.ChangeOwnerDTO);
    if (respOrm.err) {
      (status = "Failure"),
        (errorCode = respOrm.err.code),
        (message = respOrm.err.messsage),
        (statusCode = enum_.CODE_BAD_REQUEST);
    } else {
      (message = "Got Wallets"), (statusCode = enum_.CODE_CREATED);
      Object.assign(data, {respOrm});
      let mailObj = {
        eventType:"changeOwner",
        email:respOrm.email,
        validationString: respOrm.postFix,
        username: respOrm.name
      }
     
      await pub.Publish(JSON.stringify(mailObj),process.env.MAIL_TOPIC);
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

exports.Authenticate = async (req,res) => {
  let status = "Success",
    errorCode = "",
    message = "",
    data = {},
    statusCode = 0,
    resp = {};
  let respOrm;
  try {
    dto.AuthenticateDTO = req.params;
    respOrm = await orm.Authenticate(dto.AuthenticateDTO);
    if (respOrm.err) {
      (status = "Failure"),
        (errorCode = respOrm.err.code),
        (message = respOrm.err.messsage),
        (statusCode = enum_.CODE_BAD_REQUEST);
    } else {
      (message = "Owner Changed"), (statusCode = enum_.CODE_CREATED);
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