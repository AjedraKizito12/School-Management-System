const OtherStaff = require("../models/otherStaff");
const { StatusCodes } = require("http-status-codes");
const {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} = require("../errors");

const createOtherStaff = async (req, res) => {
  // const registered_by = req.user.name;

  const staff = await OtherStaff.create({ ...req.body });
  const token = staff.createJWT();

  res
    .status(StatusCodes.CREATED)
    .json({ Staff: { name: staff.staff_name }, token });
};

const loginOtherStaff = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }
  //validate if Teacher exists
  const staff = await OtherStaff.findOne({ email });
  if (!staff) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  const isPasswordCorrect = await staff.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Please provide correct password");
  }
  const token = staff.createJWT();
  res.status(StatusCodes.OK).json({ Staff: { name: staff.staff_name }, token });
};

const getAllOtherStaff = async (req, res) => {
  const staff = await OtherStaff.find().sort("createdAt");
  if (staff.length > 0) {
    res.status(StatusCodes.OK).json({ staff, count: staff.length });
  } else {
    res.status(500);
    throw new Error("No Staff found");
  }
};

const getOtherStaff = async (req, res) => {
  const {
    params: { id: staffId },
  } = req;

  const staff = await OtherStaff.findOne({
    _id: staffId,
  });
  if (!staff) {
    throw new NotFoundError(`No otherStaff with id ${staffId}`);
  }
  res.status(StatusCodes.OK).json({ staff });
};

const updateOtherStaff = async (req, res) => {
  const {
    body: { staff_name, address, contact_no },
    params: { id: staffId },
  } = req;

  if (staff_name === "" || address === "" || contact_no === "") {
    throw new BadRequestError(
      "Staff_name or address or contact number fields cannot be empty"
    );
  }
  const staff = await OtherStaff.findByIdAndUpdate({ _id: staffId }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!staff) {
    throw new NotFoundError(`No otherStaff with id ${staffId}`);
  }
  res.status(StatusCodes.OK).json({ staff });
};

const deleteOtherStaff = async (req, res) => {
  const {
    params: { id: staffId },
  } = req;
  const staff = await OtherStaff.findByIdAndRemove({
    _id: staffId,
  });
  if (!staff) {
    throw new NotFoundError(`No otherStaff with id ${staffId}`);
  }
  res.status(StatusCodes.OK).send("Other Staff deleted from records");
};

module.exports = {
  createOtherStaff,
  loginOtherStaff,
  getAllOtherStaff,
  getOtherStaff,
  updateOtherStaff,
  deleteOtherStaff,
};
