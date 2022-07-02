const { UnauthenticatedError } = require("../errors");

const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req?.user.role) throw new UnauthenticatedError("Unauthorized user");
    const rolesArray = [...allowedRoles];

    const result = req.role
      .map((role) => rolesArray.includes(role))
      .find((val) => val === true);
    if (!result) throw new UnauthenticatedError("Access not granted");
    next();
  };
};

module.exports = verifyRoles;
