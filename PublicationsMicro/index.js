require("dotenv").config();
const server = require("./server");
server.listen(process.env.PORT);
console.log("Publications service started at port " + process.env.PORT);

server.on("error", (err) => {
  console.error(err);
});

