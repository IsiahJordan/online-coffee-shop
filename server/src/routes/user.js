const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/search", userController.search);
router.post("/password/verify", userController.verify);
router.post("/password/change", userController.changePassword)
router.post("/temporary", userController.temporary);
router.post("/authorize", userController.authorize);
router.post("/logout", userController.logout);

module.exports = router;
