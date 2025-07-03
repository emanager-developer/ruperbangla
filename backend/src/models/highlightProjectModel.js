const mongoose = require("mongoose");

const HighlightProjectSchema = new mongoose.Schema({
  
  title: {
    type: String,
    required: true,
  },
  description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
});

const HighlightProject = mongoose.model(
  "HighlightProject",
  HighlightProjectSchema
);

module.exports = HighlightProject;
