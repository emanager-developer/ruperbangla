const Banner = require("../models/bannerModel");
const fs = require("fs");

exports.add = async (req, res) => {
  const bg = req?.file?.filename;
  const data = req?.body;

  try {
    if (!bg) {
      return res.json({
        success: false,
        message: "image is required",
      });
    }

    const info = {
      ...data,
      bg: `banner/${bg}`,
    };
    const result = await Banner.create(info);

    res.status(201).json({
      success: true,
      message: "Banner created successfully",
      data: result,
    });
  } catch (err) {
    fs.unlink(`./uploads/banner/${bg}`, (err) => {
      if (err) {
        console.log(err);
      }
    });

    res.json({
      success: false,
      message: err.message,
    });
  }
};

exports.getAll = async (req, res) => {
  try {
    const result = await Banner.find({});

    res.status(200).json({
      success: true,
      message: "Banner fetched successfully",
      data: result,
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
};

exports.getSingle = async (req, res) => {
  const id = req?.params?.id;

  try {
    const result = await Banner.findById(id);

    if (!result) {
      return res.json({
        success: false,
        message: "Banner not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Banner fetched successfully",
      data: result,
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
};

exports.update = async (req, res) => {
  const id = req?.params?.id;
  const bg = req?.file?.filename;
  const data = req?.body;

  try {
    const isExist = await Banner.findById(id);

    if (!isExist) {
      if (bg) {
        fs.unlink(`./uploads/banner/${bg}`, (err) => {
          if (err) {
            console.log(err);
          }
        });
      }

      return res.json({
        success: false,
        message: "Banner not found",
      });
    }

    const newData = {
      ...data,
      bg: bg ? `banner/${bg}` : isExist?.bg,
    };

    const result = await Banner.findByIdAndUpdate(id, newData, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "Banner updated successfully",
      data: result,
    });
  } catch (error) {
    fs.unlink(`./uploads/banner/${bg}`, (err) => {
      if (err) {
        console.log(err);
      }
    });

    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.destroy = async (req, res) => {
  const id = req?.params?.id;

  try {
    const isExist = await Banner.findById(id);

    if (!isExist) {
      return res.json({
        success: false,
        message: "Banner not found",
      });
    }

    await Banner.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Banner deleted successfully",
    });

    fs.unlink(`./uploads/${isExist?.bg}`, (err) => {
      if (err) {
        console.log(err);
      }
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
};