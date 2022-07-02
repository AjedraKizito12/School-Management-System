const mongoose = require("mongoose");
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
    user_role: {
      type: String,
      required: [true, "Please provide user_type_id"],
      default: "staff",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("OtherStaff", otherStaffSchema);
