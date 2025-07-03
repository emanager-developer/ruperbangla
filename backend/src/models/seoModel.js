const mongoose = require("mongoose");

const seoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    keywords: {
      type: Array,
    },
    author: {
      type: String,
    },
    metaContent: {
      type: String,
    },
    description: {
      type: String,
      require: true,
    },
  },
  { timestamps: false }
);

const SEO = mongoose.model("SEO", seoSchema);

module.exports = SEO;
