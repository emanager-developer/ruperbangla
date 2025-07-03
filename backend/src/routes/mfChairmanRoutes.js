const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  createMFChairman,
  getMFChairman,
  updateMFChairman,
} = require("../controllers/mfChairmanControllers");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/director");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

router.get("/", getMFChairman);
router.post("/add", upload.single("image"), createMFChairman);
router.patch("/update/:id", upload.single("image"), updateMFChairman);

module.exports = router;
