const User = require("../../models/User");
const { compare } = require("../../services/crypto");
const { signAccessToken, signRefreshToken } = require("../../services/JWT");

const handleLogin = async (req, res) => {
  const cookies = req.cookies;

  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .json({ message: "Email and password are required." });

  const foundUser = await User.findOne({ email }).exec();

  if (!foundUser) return res.sendStatus(401); //Unauthorized
  // evaluate password
  const match = await compare(password, foundUser.password);
  if (match) {
    const roles = Object.values(foundUser.roles).filter(Boolean);
    // create JWTs
    const accessToken = signAccessToken(foundUser, roles);

    const newRefreshToken = signRefreshToken(foundUser);

    // Changed to let keyword
    let newRefreshTokenArray = !cookies?.token
      ? foundUser.refreshToken
      : foundUser.refreshToken.filter((rt) => rt !== cookies.token);

    if (cookies?.token) {
      /* 
          Scenario added here: 
              1) User logs in but never uses RT and does not logout 
              2) RT is stolen
              3) If 1 & 2, reuse detection is needed to clear all RTs when user logs in
          */
      const refreshToken = cookies.token;
      const foundToken = await User.findOne({ refreshToken }).exec();

      // Detected refresh token reuse!
      if (!foundToken) {
        // clear out ALL previous refresh tokens
        newRefreshTokenArray = [];
      }

      res.clearCookie("token", {
        httpOnly: true,
        sameSite: "None",
        secure: true,
      });
    }

    // Saving refreshToken with current user
    foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
    const result = await foundUser.save();

    // Creates Secure Cookie with refresh token
    res.cookie("token", newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });

    // Send authorization roles and access token to user
    res.json({ accessToken });
  } else {
    res.sendStatus(401);
  }
};

module.exports = { handleLogin };
