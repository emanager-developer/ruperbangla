const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    hotNumber: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    wpLink: {
      type: String,
      required: true,
    },
    facebookLink: {
      type: String,
    },
    twitterLink: {
      type: String,
    },
    linkedinLink: {
      type: String,
    },
    youtubeLink: {
      type: String,
    },
  },
  { timestamps: false }
);

const Contact = mongoose.model("Contact", ContactSchema);

module.exports = Contact;
