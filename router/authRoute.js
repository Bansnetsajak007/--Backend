// package
const router = require("express").Router();
// items
const fetchuser = require("../middleware/fetchuser");
const authController = require("../controllers/authController")


// routes
// router.get("/", authController.get);

module.exports = router;