const mongoose = require("mongoose");

const videoGallerySchema = new mongoose.Schema({
  videoId: {
    type: String,
    required: true,
  },
});

const VideoGallery = mongoose.model("VideoGallery", videoGallerySchema);

module.exports = VideoGallery;
