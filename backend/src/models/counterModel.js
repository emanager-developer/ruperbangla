const mongoose = require("mongoose");

const counterSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    bgImage: {
      type: String,
      required: true,
    },
    counts: [
      {
        title: {
          type: String,
          required: true,
        },
        number: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const Counter = mongoose.model("Counter", counterSchema);

module.exports = Counter;
