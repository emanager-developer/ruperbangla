const router = require("express").Router();
const {
  getWhyChooseSection,
  addWhyChooseSection,
  updateWhyChooseSection,
} = require("../controllers/whychooseSectonController");

router.get("/", getWhyChooseSection);
router.post("/add", addWhyChooseSection);
router.patch("/update/:id", updateWhyChooseSection);

module.exports = router;