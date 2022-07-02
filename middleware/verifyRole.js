const { UnauthenticatedError } = require("../errors");

const verifyRoles = (roles) => (req, res, next) => {
  if (roles.includes(req.user.role)) {
    next();
  } else throw new UnauthenticatedError("Unauthorized user");
};

module.exports = verifyRoles;
