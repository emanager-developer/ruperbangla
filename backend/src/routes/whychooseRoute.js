const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  add,
  get,
  getSingle,
  destroy,
} = require("../controllers/whychooseController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/whychoose");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

router.get("/", get);
router.get("/:id", getSingle);
router.post("/add", upload.single("image"), add);
router.delete("/delete/:id", destroy);

module.exports = router;
