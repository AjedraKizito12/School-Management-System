const express = require("express");
const router = express.Router();
const authStudent = require("../middleware/authenticateStudent");
const authTeacher = require("../middleware/aunthenticateTeacher");

const {
  createStudent,
  deleteStudent,
  getAllStudents,
  updateStudent,
  getStudent,
  loginStudent,
} = require("../controllers/students");

router.route("/").post(createStudent);
router.route("/login").post(loginStudent);
router.route("/", authTeacher).get(getAllStudents);
router.route("/:id", authStudent, authTeacher).get(getStudent);
router.route("/:id").patch(updateStudent).delete(deleteStudent);

module.exports = router;
