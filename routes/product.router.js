const router = require("express").Router();
const productController = require("../controllers/productController");

router.post("/", productController.handleNewProduct);
router.get("/", productController.handleGetAllProducts);
router.get("/:productId", productController.handleGetProductById);

module.exports = router;
