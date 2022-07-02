const OtherStaff = require("../models/otherStaff");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const createOtherStaff = async (req, res) => {
  req.body.createdBy = req.superAdmin.adminId;
  const otherStaff = await OtherStaff.create(req.body);
  res.status(StatusCodes.CREATED).json({ otherStaff });

  const registered_by = req.user.name;
  console.log(registered_by);
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
  getAllOtherStaff,
  getOtherStaff,
  updateOtherStaff,
  deleteOtherStaff,
};
