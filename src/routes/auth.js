const express = require("express");
const AuthController = require("../controllers/AuthController");
const router = express.Router();


router.get("/register", AuthController.register);
router.get("/login", AuthController.login);

module.exports = router;