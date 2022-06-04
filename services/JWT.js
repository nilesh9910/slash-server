const {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
} = require("../constants/constant");
const jwt = require("jsonwebtoken");

const signAccessToken = (user, roles) => {
  return jwt.sign(
    {
      UserInfo: {
        email: user.email,
        roles: roles,
      },
    },
    ACCESS_TOKEN_SECRET,
    { expiresIn: "600s" }
  );
};

const signRefreshToken = (user) => {
  return jwt.sign({ email: user.email }, REFRESH_TOKEN_SECRET, {
    expiresIn: "10d",
  });
};

module.exports = { signAccessToken, signRefreshToken };
