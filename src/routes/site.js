const express = require("express");
const SiteController = require("../controllers/SiteController");
const router = express.Router();

router.get("/", SiteController.index);

module.exports = router;