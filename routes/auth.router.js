const router = require("express").Router();
const authController = require("../controllers/auth/authController");
const registerController = require("../controllers/auth/registerController");
const logoutController = require("../controllers/auth/logoutController");
const refreshTokenController = require("../controllers/auth/refreshTokenController");

router.post("/register", registerController.handleNewUser);
router.post("/login", authController.handleLogin);
router.get("/logout", logoutController.handleLogout);
router.get("/refresh", refreshTokenController.handleRefreshToken);

module.exports = router;
