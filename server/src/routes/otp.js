const express = require('express');
const router = express.Router();
const otpsController = require('../controllers/otpsController');

router.use("/create", otpsController.initOTP);
router.use("/verify", otpsController.verifyOTP);
router.use("/success", otpsController.successOTP);

module.exports = router;
