const express = require("express");
const authTeacher = require("../middleware/aunthenticateTeacher");
const authAdmin = require("../middleware/authenticateAdmin");

const router = express.Router();

const {
  createTeacher,
  loginTeacher,
  getAllTeachers,
  getTeacher,
  updateTeacher,
  deleteTeacher,
} = require("../controllers/teachers");

router.route("/register", authAdmin).post(createTeacher);
router.route("/login", authTeacher).post(loginTeacher);
router.route("/").get(getAllTeachers);
router.route("/:id", authTeacher).get(getTeacher);
router.route("/:id").patch(updateTeacher);
router.route("/delete/:id").delete(deleteTeacher);

module.exports = router;
