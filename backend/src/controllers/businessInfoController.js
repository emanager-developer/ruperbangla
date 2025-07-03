const BusinessInfo = require("../models/businessInfoModel");

exports.add = async (req, res) => {
  try {
    const data = req?.body;

    const isExist = await BusinessInfo.findOne({});
    if (isExist) {
      return res.status(400).json({
        success: false,
        message: "BusinessInfo already exists",
      });
    }

    const result = await BusinessInfo.create(data);

    res.status(201).json({
      success: true,
      message: "BusinessInfo created successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.get = async (req, res) => {
  try {
    const result = await BusinessInfo.findOne({});

    res.status(200).json({
      success: true,
      message: "BusinessInfo found successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.update = async (req, res) => {
  const data = req?.body;
  const id = req?.params?.id;

  try {
    const result = await BusinessInfo.findByIdAndUpdate(id, data, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "BusinessInfo updated successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
