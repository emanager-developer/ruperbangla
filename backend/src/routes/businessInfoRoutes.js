const { add, get, update } = require("../controllers/businessInfoController");

const router = require("express").Router();

router.get("/get", get);
router.post("/add", add);
router.patch("/update/:id", update);

module.exports = router;
