const Student = require("../models/student");
const { StatusCodes } = require("http-status-codes");
const {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} = require("../errors");

const createStudent = async (req, res) => {
  const registered_by = req.user.name;

  const student = await Student.create({ ...req.body });
  const token = student.createJWT();

  res
    .status(StatusCodes.CREATED)
    .json({ Student: { name: student.student_name }, token });
};

const loginStudent = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }
  //validate if Student exists
  const student = await Student.findOne({ email });
  if (!student) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  const isPasswordCorrect = await student.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Please provide correct password");
  }
  const token = student.createJWT();
  res
    .status(StatusCodes.OK)
    .json({ Student: { name: student.student_name }, token });
};

const getAllStudents = async (req, res) => {
  const students = await Student.find().sort("createdAt");
  if (students.length > 0) {
    res.status(StatusCodes.OK).json({ students, count: students.length });
  } else {
    res.status(500);
    throw new Error("No Student found");
  }
};

const getStudent = async (req, res) => {
  const {
    params: { id: studentId },
  } = req;

  const student = await Student.findOne({
    _id: studentId,
  });
  if (!student) {
    throw new NotFoundError(`No student with id ${studentId}`);
  }
  res.status(StatusCodes.OK).json(student);
};

const updateStudent = async (req, res) => {
  const {
    body: { student_name, class_name },
    params: { id: studentId },
  } = req;

  if (student_name === "" || class_name === "") {
    throw new BadRequestError("student_name or address fields cannot be empty");
  }
  const student = await Student.findByIdAndUpdate(
    { _id: studentId },

    req.body,
    { new: true, runValidators: true }
  );
  if (!student) {
    throw new NotFoundError(`No student with id ${studentId}`);
  }
  res.status(StatusCodes.OK).json({ student });
};

const deleteStudent = async (req, res) => {
  const {
    params: { id: studentId },
  } = req;
  const student = await Student.findByIdAndRemove({
    _id: studentId,
  });
  if (!student) {
    throw new NotFoundError(`No student with id ${studentId}`);
  }
  res.status(StatusCodes.OK).send("Student deleted from records");
};

module.exports = {
  createStudent,
  loginStudent,
  getAllStudents,
  getStudent,
  updateStudent,
  deleteStudent,
};
