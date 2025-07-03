const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const {
  getAll,
  add,
  update,
  destroy,
  getSingle,
} = require("../controllers/bannerController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/banner");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage }).single("image");

router.get("/all", getAll);
router.get("/:id", getSingle);
router.post("/add", upload, add);
router.patch("/update/:id", upload, update);
router.delete("/delete/:id", destroy);

module.exports = router;
