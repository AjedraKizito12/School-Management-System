const express = require("express");
const auth = require("../middleware/authenticate");

const router = express.Router();

const {
  createOtherStaff,
  getAllOtherStaff,
  getOtherStaff,
  updateOtherStaff,
  deleteOtherStaff,
} = require("../controllers/otherStaff");

router.route("/register").post(createOtherStaff);

router.route("/").get(auth, getAllOtherStaff);
router.route("/:id").get(auth, getOtherStaff);
router
  .route("/:id")
  .patch(auth, updateOtherStaff)
  .delete(auth, deleteOtherStaff);

module.exports = router;
