const fs = require("fs");
const Service = require("../models/serviceModel");

exports.add = async (req, res) => {
  const image = req?.file?.filename;
  const data = req.body;

  try {
    const result = await Service.create({
      ...data,
      image: `services/${image}`,
    });

    res.status(201).json({
      success: true,
      message: "Service created successfully",
      data: result,
    });
  } catch (error) {
    if (image) {
      fs.unlink(`./uploads/services/${image}`, (err) => {
        if (err) console.error("Failed to delete image:", err);
      });
    }

    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAll = async (req, res) => {
  try {
    const result = await Service.find({});

    if (!result) {
      return res.json({
        success: false,
        message: "No Service found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Services fetched successfully",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.getSingle = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Service.findById(id);

    if (!result) {
      return res.json({
        success: false,
        message: "Service not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Service fetched successfully",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const image = req?.file?.filename;

  try {
    const isExist = await Service.findById(id);

    if (!isExist) {
      if (image) {
        fs.unlink(`./uploads/services/${image}`, (err) => {
          if (err) console.error("Failed to delete uploaded image:", err);
        });
      }
      return res.json({
        success: false,
        message: "Service not found",
      });
    }

    const updatedData = {
      ...data,
      image: image ? `services/${image}` : isExist?.image,
    };

    const result = await Service.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "Service updated successfully",
      data: result,
    });

    if (image && result) {
      fs.unlink(`./uploads/${isExist?.image}`, (err) => {
        if (err) console.error("Failed to delete old image:", err);
      });
    }
  } catch (error) {
    if (image) {
      fs.unlink(`./uploads/services/${image}`, (err) => {
        if (err) console.error("Failed to delete uploaded image:", err);
      });
    }

    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.destroy = async (req, res) => {
  const { id } = req.params;

  try {
    const isExist = await Service.findById(id);

    if (!isExist) {
      return res.json({
        success: false,
        message: "Service not found",
      });
    }

    const result = await Service.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Service deleted successfully",
    });

    if (result && isExist?.image) {
      fs.unlink(`./uploads/${isExist?.image}`, (err) => {
        if (err) console.error("Failed to delete image:", err);
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
