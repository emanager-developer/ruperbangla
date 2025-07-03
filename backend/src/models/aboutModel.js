const mongoose = require("mongoose");

const AboutSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  subTitle: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  profileDoc: {
    type: String,
  },
});

const AboutUs = mongoose.model("AboutUs", AboutSchema);

module.exports = AboutUs;
