const jwt = require("jsonwebtoken");

const token = (ID, Email, Username, Name) =>
  jwt.sign(
    { id: ID, email: Email, username: Username, name: Name },
    process.env.JWTKEY,
    {
      expiresIn: "720h",
    }
  );

module.exports = { token };
