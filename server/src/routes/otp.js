const express = require('express');
const router = express.Router();
const otpsController = require('../controllers/otpsController');

router.use("/create", otpsController.initOTP);
router.use("/verify", otpsController.verifyOTP);
router.use("/success", otpsController.successOTP);
router.use("/email", otpsController.messageEmail);

module.exports = router;
