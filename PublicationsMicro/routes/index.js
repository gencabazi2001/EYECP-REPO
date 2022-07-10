const apiServices = require("../controller/index");

const routers = (app) => {
  app.use("/pub", apiServices);
};

module.exports = routers;
