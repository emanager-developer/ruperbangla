const mongoose = require("mongoose");

const mfMdSchema = new mongoose.Schema({
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

const MFMd = mongoose.model("MFMd", mfMdSchema);
module.exports = MFMd;
