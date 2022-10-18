const express = require("express");
const { findUserByUserName } = require("../controllers/UserController");
const router = express.Router();

router.route("/query").get(findUserByUserName);

module.exports = router;
