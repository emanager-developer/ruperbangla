const mongoose = require("mongoose");
const Gallery = require("./galleryModel");

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
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

serviceSchema.pre("findOneAndDelete", async function (next) {
  const serviceId = this.getQuery()._id;

  const galleryExists = await Gallery.exists({ service: serviceId });

  if (galleryExists) {
    const error = new Error(
      "Cannot delete service because galleries are associated with it."
    );
    return next(error);
  }

  next();
});

const Service = mongoose.model("Service", serviceSchema);

module.exports = Service;
