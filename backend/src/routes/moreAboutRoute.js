const router = require("express").Router();
const verifyAdmin = require("../middleware/verifyAdmin");
const {
  add,
  update,
  get,
  destroy,
  getSingle,
  getBySlug,
} = require("../controllers/moreAboutController");

router.get("/", get);
router.post("/add", add);
router.get("/:id", getSingle);
router.get("/slug/:slug", getBySlug);
router.patch("/update/:id", verifyAdmin, update);
router.delete("/delete/:id", verifyAdmin, destroy);

module.exports = router;
