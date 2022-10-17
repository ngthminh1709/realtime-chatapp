const express = require("express");
const AuthController = require("../controllers/AuthController");
const router = express.Router();

router.get("/register", AuthController.register);
router.post("/register", AuthController.registerNewUser);
router.get("/login", AuthController.login);

module.exports = router;
