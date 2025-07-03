const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const {
  addProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
  getRecentProjects,
} = require("../controllers/projectController");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, "../../uploads/projects");

    fs.access(uploadPath, (error) => {
      if (error) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }
      cb(null, uploadPath);
    });
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|svg|webp|png/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error("Only images are allowed (jpeg, jpg, png)"));
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter: fileFilter,
});

router.post(
  "/add",
  upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "galleryImages", maxCount: 10 },
  ]),
  addProject
);

router.get("/", getProjects);
router.get("/Recent", getRecentProjects);

router.get("/:id", getProjectById);

router.patch(
  "/update/:id",
  upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "galleryImages", maxCount: 10 },
  ]),
  updateProject
);

router.delete("/delete/:id", deleteProject);

module.exports = router;
