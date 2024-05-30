// package
const router = require("express").Router();
// items
const fetchuser = require("../middleware/fetchuser");
const blogsController = require("../controllers/blogsController")


// routes
// router.get("/", blogsController.get);

module.exports = router;