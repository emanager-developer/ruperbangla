const mongoose = require("mongoose");

const WhychooseSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
});

const Whychoose = mongoose.model("Whychoose", WhychooseSchema);

module.exports = Whychoose;
