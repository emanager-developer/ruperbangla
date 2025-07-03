const mongoose = require("mongoose");

const moreAboutSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const MoreAbout = mongoose.model("MoreAbout", moreAboutSchema);
module.exports = MoreAbout;
