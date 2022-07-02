const express = require("express");
const router = express.Router();

const { register, loginAdmin } = require("../controllers/superAdmin");

router.route("/register").post(register);
router.route("/login").post(loginAdmin);

// router.route("/:Id", auth).get(getAdmin);

module.exports = router;
