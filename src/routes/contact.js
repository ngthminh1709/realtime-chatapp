const express = require("express");
const ContactController = require("../controllers/ContactController");
const router = express.Router();

router.post('/add-friend/:id', ContactController.addNewFriend);
router.post('/remove-request/:id', ContactController.removeRequestContact);

module.exports = router;
