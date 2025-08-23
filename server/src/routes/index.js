const express = require("express");
const router = express.Router();

const usersRouter = require("./user");
const otpsRotuer = require("./otp");
const prodRouter = require("./product");

router.use("/users", usersRouter);
router.use("/otp", otpsRotuer);
router.use("/products", prodRouter);

module.exports = router;

