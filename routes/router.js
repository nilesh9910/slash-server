const router = require("express").Router();

router.use("/auth", require("./auth.router.js"));
router.use("/products", require("./product.router.js"));

module.exports = router;
