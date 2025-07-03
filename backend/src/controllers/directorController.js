const fs = require("fs");
const Director = require("../models/directorsModel");

exports.add = async (req, res) => {
  const image = req?.file?.filename;
  const { name, designation, description } = req.body;

  try {
    const newDirector = await Director.create({
      name,
      designation,
      description,
      image: `director/${image}`,
    });

    res.status(201).json({
      success: true,
      message: "Director created successfully",
      data: newDirector,
    });
  } catch (error) {
    // If image exists, delete the uploaded file in case of an error
    if (image) {
      fs.unlink(`./uploads/director/${image}`, (err) => {
        if (err) console.error("Failed to delete image:", err);
      });
    }

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getAll = async (req, res) => {
  try {
    const directors = await Director.find(); // Fix variable name to avoid confusion

    if (!directors || directors.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No Director found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Directors fetched successfully",
      data: directors,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getSingle = async (req, res) => {
  const { id } = req.params;

  try {
    const director = await Director.findById(id); // Fix variable name

    if (!director) {
      return res.status(404).json({
        success: false,
        message: "Director not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Director fetched successfully",
      data: director,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { name, designation, description } = req.body;
  const image = req?.file?.filename;

  try {
    const existingDirector = await Director.findById(id);

    if (!existingDirector) {
      if (image) {
        fs.unlink(`./uploads/director/${image}`, (err) => {
          if (err) console.error("Failed to delete uploaded image:", err);
        });
      }
      return res.status(404).json({
        success: false,
        message: "Director not found",
      });
    }

    if (image && existingDirector.image) {
      // Delete the old image if a new image is uploaded
      fs.unlink(`./uploads/director/${existingDirector.image}`, (err) => {
        if (err) console.error("Failed to delete old image:", err);
      });
    }

    const updatedData = {
      name: name || existingDirector.name,
      designation: designation || existingDirector.designation,
      description: description || existingDirector.description,
      image: image ? `director/${image}` : existingDirector.image,
    };

    const updatedDirector = await Director.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "Director updated successfully",
      data: updatedDirector,
    });
  } catch (error) {
    if (image) {
      fs.unlink(`./uploads/director/${image}`, (err) => {
        if (err) console.error("Failed to delete uploaded image:", err);
      });
    }

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.destroy = async (req, res) => {
  const { id } = req.params;

  try {
    const director = await Director.findById(id); // Fix variable name

    if (!director) {
      return res.status(404).json({
        success: false,
        message: "Director not found",
      });
    }

    if (director.image) {
      // Delete the image if it exists
      fs.unlink(`./uploads/director/${director.image}`, (err) => {
        if (err) console.error("Failed to delete image:", err);
      });
    }

    await Director.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Director deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
