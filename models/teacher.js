const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const teacherSchema = mongoose.Schema(
  {
    registered_by: {
      type: String,
      required: true,
      ref: "Admin",
    },
    teacher_name: {
      type: String,
      required: true,
    },
    teacherId: {
      type: Number,
    },

    address: {
      type: String,
      required: true,
    },

    gender: {
      type: String,
      required: true,
    },
    subjectToTeach: {
      type: String,
      required: true,
    },
    contact_no: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide a valid email",
      ],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide password"],
    },
    user_type: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

teacherSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// create token
teacherSchema.methods.createJWT = function () {
  return jwt.sign(
    { teacherId: this._id, name: this.teacher_name },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME }
  );
};

//compare password
teacherSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model("Teachers", teacherSchema);
