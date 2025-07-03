const mongoose = require("mongoose");

const directorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  designation: {
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
});

const director = mongoose.model("director", directorSchema);

module.exports = director;
