const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController.js");

router.use("/list", productController.productList);

module.exports = router;
