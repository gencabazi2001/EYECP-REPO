const apiServices = require("../controller/index");

const routers = (app) => {
  app.use("/user", apiServices);
};

module.exports = routers;
