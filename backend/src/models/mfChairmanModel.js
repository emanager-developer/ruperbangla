const mongoose = require("mongoose");

const mfChairmanSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const MFChairman = mongoose.model("MFChairman", mfChairmanSchema);
module.exports = MFChairman;
