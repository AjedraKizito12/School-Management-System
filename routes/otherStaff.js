const express = require("express");

const router = express.Router();

const {
  createOtherStaff,
  loginOtherStaff,
  getAllOtherStaff,
  getOtherStaff,
  updateOtherStaff,
  deleteOtherStaff,
} = require("../controllers/otherStaff");

router.route("/register").post(createOtherStaff);
router.route("/login").post(loginOtherStaff);
router.route("/").get(getAllOtherStaff);
router.route("/:id").get(getOtherStaff);
router.route("/:id").patch(updateOtherStaff).delete(deleteOtherStaff);

module.exports = router;
