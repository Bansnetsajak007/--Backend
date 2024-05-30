// package
const router = require("express").Router();
// items
const fetchuser = require("../middleware/fetchuser");
const chatController = require("../controllers/chatController")


// routes
// router.get("/", chatController.get);

module.exports = router;