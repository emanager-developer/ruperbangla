const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  createMFMd,
  getMFMd,
  updateMFMd,
} = require("../controllers/mfMdControllers");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/director");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

router.get("/", getMFMd);
router.post("/add", upload.single("image"), createMFMd);
router.patch("/update/:id", upload.single("image"), updateMFMd);

module.exports = router;
