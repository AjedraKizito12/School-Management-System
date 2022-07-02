const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const otherStaffSchema = mongoose.Schema(
  {
    // registered_by: {
    //   type: String,
    //   required: true,
    //   ref: "Admin",
    // },
    staff_name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    contact_no: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
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
    work: {
      type: String,
      required: true,
    },
    user_role: {
      type: String,
      required: [true, "Please provide user_type_id"],
      default: "Staff",
    },
  },
  {
    timestamps: true,
  }
);

otherStaffSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// create token
otherStaffSchema.methods.createJWT = function () {
  return jwt.sign(
    { staffId: this._id, name: this.name, role: this.user_role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME }
  );
};

//compare password
otherStaffSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model("OtherStaff", otherStaffSchema);
