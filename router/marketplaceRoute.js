// package
const router = require("express").Router();
// items
const fetchuser = require("../middleware/fetchuser");
const marketplaceController = require("../controllers/marketplaceController.js")

// routes
// router.get("/", marketplaceController.get);

module.exports = router;