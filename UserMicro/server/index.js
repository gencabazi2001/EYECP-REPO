const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const server = express();
const cors = require("cors");

server.use(helmet());
server.use(cors());

server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

server.use(bodyParser.json({ limit: "50mb" }));

require("../routes")(server);

module.exports = server;
