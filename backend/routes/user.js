const express = require('express');
const { signUp, logout, myProfile, updateProfile } = require('../controllers/user');
const { isAuthenticated } = require('../middlewares/auth');
const router = express.Router();

router.route("/signup").post(signUp);
router.route("/logout").get(logout);
router.route("/profile").get(isAuthenticated, myProfile);
router.route("/update/profile").post(isAuthenticated, updateProfile);

module.exports = router;