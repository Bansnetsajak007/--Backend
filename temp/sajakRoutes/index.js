const router = require("express").Router();

router.get("/", async(req, res) => {
    // TODO: Do something
    res.send("Hola")
});

module.exports = router;