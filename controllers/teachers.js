const Teacher = require("../models/teacher");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const createTeacher = async (req, res) => {
  const registered_by = req.user.name;

  const newTeacher = await Teacher.create({ ...req.body, registered_by });
  const token = newTeacher.createJWT();

  res
    .status(StatusCodes.CREATED)
    .json({ Teacher: { name: newTeacher.teacher_name }, token });
};

const loginTeacher = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }
  //validate if Student exists
  const teacher = await Teacher.findOne({ email });
  if (!teacher) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  const isPasswordCorrect = await teacher.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Please provide correct password");
  }
  const token = teacher.createJWT();
  res
    .status(StatusCodes.OK)
    .json({ Teacher: { name: teacher.teacher_name }, token });
};

const getAllTeachers = async (req, res) => {
  const teachers = await Teacher.find().sort("createdAt");
  if (teachers.length > 0) {
    res.status(StatusCodes.OK).json({ teachers, count: teachers.length });
  } else {
    res.status(500);
    throw new Error("No Teachers found");
  }
};

const getTeacher = async (req, res) => {
  const {
    // user: { adminId },
    params: { id: teacherId },
  } = req;

  const teacher = await Teacher.findOne({
    _id: teacherId,
    // createdBy: adminId,
  });
  if (!teacher) {
    throw new NotFoundError(`No job with id ${teacherId}`);
  }
  res.status(StatusCodes.OK).json({ teacher });
};

const updateTeacher = async (req, res) => {
  const {
    body: { teacher_name, subjectToTeach },
    // user: { adminId },
    params: { id: teacherId },
  } = req;

  if (teacher_name === "" || subjectToTeach === "") {
    throw new BadRequestError("teacher_name or address fields cannot be empty");
  }
  const teacher = await Teacher.findByIdAndUpdate(
    { _id: teacherId },
    // { _id: teacherId, registeredBy: adminId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!teacher) {
    throw new NotFoundError(`No teacher with id ${teacherId}`);
  }
  res.status(StatusCodes.OK).json({ teacher });
};

const deleteTeacher = async (req, res) => {
  const {
    // user: { adminId },
    params: { id: teacherId },
  } = req;
  const teacher = await Teacher.findByIdAndRemove({
    _id: teacherId,
    // createdBy: adminId,
  });
  if (!teacher) {
    throw new NotFoundError(`No teacher with id ${teacherId}`);
  }
  res.status(StatusCodes.OK).send("Teacher deleted from rTeacherecords");
};

module.exports = {
  createTeacher,
  loginTeacher,
  getAllTeachers,
  getTeacher,
  updateTeacher,
  deleteTeacher,
};
