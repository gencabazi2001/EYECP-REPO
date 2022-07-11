const apiServices = require("../controller/index");

const routers = (app) => {
  app.use("/filter", apiServices);
};

module.exports = routers;
