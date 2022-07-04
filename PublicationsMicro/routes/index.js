const apiServices = require("../controller/index");

const routers = (app) => {
  app.use("/pub/api", apiServices);
};

module.exports = routers;
