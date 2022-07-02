const express = require("express");
const router = express.Router();

const { createAdmin, loginAdmin } = require("../controllers/superAdmin");

router.route("/register").post(createAdmin);
router.route("/login").post(loginAdmin);

module.exports = router;
