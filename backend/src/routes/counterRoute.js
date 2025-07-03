const router = require("express").Router();
const multer = require("multer");
const { getAll, add, update } = require("../controllers/counterController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/counter");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage }).single("image");

router.get("/all", getAll);
router.post("/add", upload, add);
router.patch("/update/:id", upload, update);

module.exports = router;
