const Admin = require("../models/superAdmin");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const createAdmin = async (req, res) => {
  //create user in db
  const user = await Admin.create({ ...req.body });
  // save token
  // const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({ user: { name: user.name } });
};

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }
  const user = await Admin.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Please provide correct password");
  }
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};

module.exports = { createAdmin, loginAdmin };
