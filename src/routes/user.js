const express = require("express");
const middlewareController = require("../controllers/MiddlewareController");
const UserController = require("../controllers/UserController");
const router = express.Router();

router.get("/query", UserController.findUserByUserName);
router.put(
  "/edit/:id",
  middlewareController.adminVerifyToken,
  UserController.updateUserProfie
);

module.exports = router;
