const mongoose = require("mongoose");

const businessInfoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    startYear: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  { timestamps: false }
);

const BusinessInfo = mongoose.model("BusinessInfo", businessInfoSchema);

module.exports = BusinessInfo;
