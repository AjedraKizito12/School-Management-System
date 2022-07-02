const OtherStaff = require("../models/otherStaff");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const createOtherStaff = async (req, res) => {
  const registered_by = req.user.name;

  const otherStaff = await OtherStaff.create({ ...req.body, registered_by });
  const token = otherStaff.createJWT();
  res
    .status(StatusCodes.CREATED)
    .json({ Staff: { name: otherStaff.staff_name }, token });
};

const loginOtherStaff = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }
  //validate if Staff exists
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
  const otherStaff = await OtherStaff.find().sort("createdAt");
  if (otherStaff.length > 0) {
    res.status(StatusCodes.OK).json({ otherStaff, count: otherStaff.length });
  } else {
    res.status(500);
    throw new Error("No otherStaff found");
  }
};

const getOtherStaff = async (req, res) => {
  const {
    user: { adminId },
    params: { id: otherStaffId },
  } = req;

  const otherStaff = await OtherStaff.findOne({
    _id: otherStaffId,
    createdBy: adminId,
  });
  if (!otherStaff) {
    throw new NotFoundError(`No otherStaff with id ${otherStaffId}`);
  }
  res.status(StatusCodes.OK).json({ otherStaff });
};

const updateOtherStaff = async (req, res) => {
  const {
    body: { staff_name, address, contact_no },
    user: { adminId },
    params: { id: staffId },
  } = req;

  if (staff_name === "" || address === "" || contact_no === "") {
    throw new BadRequestError(
      "otherStaff_name or address or contact_no fields cannot be empty"
    );
  }
  const otherStaff = await OtherStaff.findByIdAndUpdate(
    // { _id: staffId },
    { _id: staffId, registeredBy: adminId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!otherStaff) {
    throw new NotFoundError(`No otherStaff with id ${staffId}`);
  }
  res.status(StatusCodes.OK).json({ otherStaff });
};

const deleteOtherStaff = async (req, res) => {
  const {
    user: { adminId },
    params: { id: staffId },
  } = req;
  const otherStaff = await OtherStaff.findByIdAndRemove({
    _id: staffId,
    createdBy: adminId,
  });
  if (!otherStaff) {
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
