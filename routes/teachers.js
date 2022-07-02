const express = require("express");
const router = express.Router();
const auth = require("../middleware/authenticate");
const verifyRoles = require("../middleware/verifyRole");
const {
  createTeacher,
  loginTeacher,
  getAllTeachers,
  getTeacher,
  updateTeacher,
  deleteTeacher,
} = require("../controllers/teachers");

router.route("/login").post(loginTeacher);

router.route("/register").post(auth, verifyRoles(["Admin"]), createTeacher);
router.route("/").get(auth, verifyRoles(["Admin"]), getAllTeachers);
router.route("/:id").get(auth, verifyRoles(["Admin", "Teacher"]), getTeacher);
router
  .route("/:id")
  .patch(auth, verifyRoles(["Admin"]), updateTeacher)
  .delete(auth, verifyRoles(["Admin"]), deleteTeacher);

module.exports = router;
