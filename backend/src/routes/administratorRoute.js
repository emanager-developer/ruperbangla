const router = require("express").Router();
const verifyToken = require("../middleware/verifyToken");
const {
  addAdministrator,
  adminLogin,
  deleteAdmin,
  getAdmins,
  getLoggedAdmin,
} = require("../controllers/administratorController");

router.post("/add", addAdministrator);
router.post("/login", adminLogin);
router.get("/all", getAdmins);
router.get("/loggedUser", verifyToken, getLoggedAdmin);
router.delete("/:id", deleteAdmin);

module.exports = router;
