const express = require("express");
const UserController = require("../controllers/UserController");
const router = express.Router();

router.get('/query', UserController.findUserByUserName)
router.put('/edit', UserController.updateUserProfie)

module.exports = router;
