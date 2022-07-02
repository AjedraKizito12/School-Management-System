const express = require("express");
const router = express.Router();
const auth = require("../middleware/authenticate");
const verifyRoles = require("../middleware/verifyRole");

const {
  createStudent,
  deleteStudent,
  getAllStudents,
  updateStudent,
  getStudent,
  loginStudent,
} = require("../controllers/students");

router.route("/login").post(loginStudent);

router.route("/").post(auth, verifyRoles(["Admin"]), createStudent);
router.route("/").get(auth, verifyRoles(["Admin", "Teacher"]), getAllStudents);
router
  .route("/:id")
  .get(auth, verifyRoles(["Admin", "Teacher", "Student"]), getStudent);
router
  .route("/:id")
  .patch(auth, verifyRoles(["Admin"]), updateStudent)
  .delete(auth, verifyRoles(["Admin"]), deleteStudent);

module.exports = router;
