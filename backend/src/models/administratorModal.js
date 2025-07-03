const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const administratorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    username: {
      type: "String",
      required: true,
      unique: true,
    },
    email: {
      type: "String",
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

administratorSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const Administrator = mongoose.model("Administrator", administratorSchema);

module.exports = Administrator;
