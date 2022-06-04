const Product = require("../models/Product");

const handleNewProduct = async (req, res) => {
  const { productName, brandName, price } = req.body;

  try {
    const duplicate = await Product.findOne({ productName }).exec();

    if (duplicate) {
      return res
        .status(409)
        .json({ message: "Product already exist. Please add another product" });
    }

    await Product.create(req.body);

    res.status(200).json({ message: `${productName} created successfully!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const handleGetProductById = async (req, res) => {
  const { productId } = req.params;

  if (!productId)
    return res.status(400).json({ message: `Please enter product id` });

  try {
    const product = await Product.findById(productId).exec();

    if (!product)
      return res
        .status(404)
        .json({ message: `product id: ${productId} is invalid.` });

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const handleGetAllProducts = async (req, res) => {
  try {
    const products = await Product.find().exec();

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  handleNewProduct,
  handleGetProductById,
  handleGetAllProducts,
};
