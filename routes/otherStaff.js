const express = require("express");
const router = express.Router();
const auth = require("../middleware/authenticate");
const verifyRoles = require("../middleware/verifyRole");
const {
  createOtherStaff,
  loginOtherStaff,
  getAllOtherStaff,
  getOtherStaff,
  updateOtherStaff,
  deleteOtherStaff,
} = require("../controllers/otherStaff");

router.route("/login").post(loginOtherStaff);

router.route("/register").post(auth, verifyRoles(["Admin"]), createOtherStaff);
router.route("/").get(auth, verifyRoles(["Admin"]), getAllOtherStaff);
router.route("/:id").get(auth, verifyRoles(["Admin", "Staff"]), getOtherStaff);
router
  .route("/:id")
  .patch(auth, verifyRoles(["Admin"]), updateOtherStaff)
  .delete(auth, verifyRoles(["Admin"]), deleteOtherStaff);

module.exports = router;
