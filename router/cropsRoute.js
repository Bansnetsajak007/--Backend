// package
const router = require("express").Router();
// items
const fetchuser = require("../middleware/fetchuser");
const cropsController = require("../controllers/cropsController")


// routes
// router.get("/", cropsController.get);

module.exports = router;