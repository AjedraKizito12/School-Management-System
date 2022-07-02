const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const otherStaffSchema = mongoose.Schema(
  {
    registered_by: {
      type: String,
      required: true,
      ref: "Admin",
    },
    staff_name: {
      type: String,
      required: true,
    },
    staffId: {
      type: Number,
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
    },
    work: {
      type: String,
      required: true,
    },

    user_type: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
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
    { staffId: this._id, name: this.staff_name },
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
