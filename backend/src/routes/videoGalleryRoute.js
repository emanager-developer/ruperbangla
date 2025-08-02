const express = require("express");
const router = express.Router();
const {
  add,
  get,
  getSingle,
  update,
  destroy,
} = require("../controllers/videoGalleryController");

router.get("/", get);
router.get("/:id", getSingle);
router.post("/add", add);
router.patch("/update/:id", update);
router.delete("/delete/:id", destroy);

module.exports = router;
