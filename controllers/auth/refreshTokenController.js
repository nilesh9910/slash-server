const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const { REFRESH_TOKEN_SECRET } = require("../../constants/constant");
const { signAccessToken, signRefreshToken } = require("../../services/JWT");

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;
  res.clearCookie("token", { httpOnly: true, sameSite: "None", secure: true });
  const foundUser = await User.findOne({ refreshToken }).exec();

  if (!foundUser) {
    jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, async (err, decoded) => {
      if (err) return res.sendStatus(403);
      const hackedUser = await User.findOne({ email: decoded.email }).exec();
      hackedUser.refreshToken = [];
      const result = await hackedUser.save();
    });
    return res.sendStatus(403);
  }

  jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, async (err, decoded) => {
    if (err) {
      foundUser.refreshToken = [...newRefreshTokenArray];
      const result = await foundUser.save();
    }

    if (err || foundUser.email !== decoded.email) return res.sendStatus(403);

    const roles = Object.values(foundUser.roles).filter(Boolean);
    const accessToken = signAccessToken(decoded, roles);

    const newRefreshToken = signRefreshToken(foundUser);

    foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
    const result = await foundUser.save();

    res.cookie("token", newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 10 * 24 * 60 * 60 * 1000,
    });

    res.json({ accessToken });
  });
};

module.exports = { handleRefreshToken };
