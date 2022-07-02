const express = require("express");
const auth = require("../middleware/authenticate");

// const verifyRoles = require("../middleware/verifyRole");

const router = express.Router();

const {
  createTeacher,
  loginTeacher,
  getAllTeachers,
  getTeacher,
  updateTeacher,
  deleteTeacher,
} = require("../controllers/teachers");

router.route("/login").post(loginTeacher);

router.route("/register").post(auth, createTeacher);
router.route("/").get(auth, getAllTeachers);
router.route("/:id").get(auth, getTeacher);
router.route("/:id").patch(auth, updateTeacher).delete(auth, deleteTeacher);

module.exports = router;
