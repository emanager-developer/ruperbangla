const VideoGallery = require("../models/videoGalleryModel");

exports.add = async (req, res) => {
  const data = req?.body;
  try {
    let result = await VideoGallery.create(data);

    res.status(201).json({
      success: true,
      message: "Gallery created successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

exports.get = async (req, res) => {
  try {
    const result = await VideoGallery.find({});

    if (!result) {
      return res.status(404).json({
        success: false,
        error: "Gallery not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Gallery fetched successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

exports.getSingle = async (req, res) => {
  try {
    let { id } = req.params;
    const result = await VideoGallery.findById(id);

    if (!result) {
      return res.status(404).json({
        success: false,
        error: "Gallery not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Gallery Fetch Successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

exports.update = async (req, res) => {
  const id = req?.params?.id;
  const data = req?.body;

  try {
    const isExist = await VideoGallery.findById(id);

    if (!isExist) {
      return res.status(404).json({
        success: false,
        error: "Gallery not found",
      });
    }

    const result = await VideoGallery.findByIdAndUpdate(id, data, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "Gallery updated successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.destroy = async (req, res) => {
  const id = req?.params?.id;

  try {
    const isExist = await VideoGallery.findById(id);

    if (!isExist) {
      return res.status(404).json({
        success: false,
        error: "Gallery not found",
      });
    }

    const result = await VideoGallery.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Gallery delete successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
