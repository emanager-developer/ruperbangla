const mongoose = require("mongoose");

const whychooseSectionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    
  },
  { timestamps: false }
);

const WhyChooseSection = mongoose.model("WhyChooseSection", whychooseSectionSchema);

module.exports = WhyChooseSection;
