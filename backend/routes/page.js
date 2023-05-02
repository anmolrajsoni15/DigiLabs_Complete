const express = require('express');
const { isAuthenticated } = require('../middlewares/auth');
const { updatePageData, getPageData } = require('../controllers/page');

const router = express.Router();

router.route("/page/update").post(isAuthenticated, updatePageData);
router.route("/page").get(isAuthenticated, getPageData);

module.exports = router;