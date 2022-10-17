const express = require("express");
const AuthController = require("../controllers/AuthController");
const router = express.Router();

router.get("/register", AuthController.registerPage);
router.get("/login", AuthController.loginPage);
router.post("/register", AuthController.registerNewUser);
router.post("/login", AuthController.loginUser);

module.exports = router;
