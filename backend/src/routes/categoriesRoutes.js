const router = require("express").Router();
const {
  addCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoriesController");

router.post("/add", addCategory);

router.get("/all", getCategories);
router.get("/:id", getCategory);

router.patch("/update/:id", updateCategory);
router.delete("/delete/:id", deleteCategory);

module.exports = router;
