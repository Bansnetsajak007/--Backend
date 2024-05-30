// package
const router = require("express").Router();
// items
const fetchuser = require("../middleware/fetchuser");
const animalsController = require("../controllers/animalsController")


// routes
// router.get("/", animalsController.get);

module.exports = router;