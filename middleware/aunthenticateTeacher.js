const Teacher = require("../models/teacher");
const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");

const authTeacher = async (req, res, next) => {
  // check header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnauthenticatedError("Authentication invalid");
  }
  let token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    if (!(Teacher.user_type_id === res.body._id)) {
      throw new UnauthenticatedError("Teacher cannot access this information");
    }
    req.Teacher = payload;
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication invalid");
  }
};

module.exports = authTeacher;
