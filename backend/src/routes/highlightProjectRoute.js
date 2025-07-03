const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  getProject,
  updateProject,
  createProject,
} = require("../controllers/highlightProjectController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/highlightProject");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

router.get("/", getProject);
router.post("/add-project", upload.single("image"), createProject);
router.patch("/update-project/:id", upload.single("image"), updateProject);

module.exports = router;
