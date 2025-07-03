const router = require("express").Router();
const {
  getContacts,
  addContact,
  updateContact,
} = require("../controllers/contactController");

router.get("/", getContacts);
router.post("/add-contact", addContact);
router.patch("/update-contact/:id", updateContact);

module.exports = router;