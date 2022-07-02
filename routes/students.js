const express = require("express");
const router = express.Router();
const auth = require("../middleware/authenticate");
// const verifyRoles = require("../middleware/verifyRole");

const {
  createStudent,
  deleteStudent,
  getAllStudents,
  updateStudent,
  getStudent,
  loginStudent,
} = require("../controllers/students");

router.route("/login").post(loginStudent);

router.route("/").post(auth, createStudent);
router.route("/").get(auth, getAllStudents);
router.route("/:id").get(auth, getStudent);
router.route("/:id").patch(auth, updateStudent).delete(auth, deleteStudent);

module.exports = router;
