const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  gallery: [
    {
      type: String,
      required: true,
    },
  ],
  description: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Types.ObjectId,
    ref: "Categories",
    required: true,
  },
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
