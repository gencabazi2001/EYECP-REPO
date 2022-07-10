const apiServices = require("../controller/index");

const routers = (app) => {
  app.use("/wallet", apiServices);
};

module.exports = routers;
