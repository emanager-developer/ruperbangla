const fs = require("fs");
const Logo = require("../models/logoModel");

exports.addLogo = async (req, res) => {
  const file = req?.file?.filename;
  try {
    if (!file) {
      return res.status(400).json({
        success: false,
        message: "Logo is required",
      });
    }

    const logo = {
      logo: `/logo/${file}`,
    };

    const isLogo = await Logo.findOne({});
    if (isLogo) {
      fs.unlink(`./uploads/logo/${file}`, (err) => {
        if (err) {
          console.error(err);
        }
      });

      return res.status(400).json({
        success: false,
        message: "Logo already added",
      });
    }

    const result = await Logo.create(logo);

    res.status(200).json({
      success: true,
      message: "Logo added successfully",
      data: result,
    });
  } catch (error) {
    fs.unlink(`./uploads/logo/${file}`, (err) => {
      if (err) {
        console.error(err);
      }
    });

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getLogos = async (req, res) => {
  try {
    const logo = await Logo.findOne({});

    res.status(200).json({
      success: true,
      message: "Logo found successfully",
      data: logo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateLogo = async (req, res) => {
  const file = req?.file?.filename;

  try {
    if (!file) {
      return res.status(400).json({
        success: false,
        message: "Logo is required",
      });
    }

    const id = req?.params?.id;
    const isLogo = await Logo.findById(id);

    if (isLogo) {
      await Logo.findByIdAndUpdate(
        id,
        { logo: `/logo/${file}` },
        { new: true }
      );

      fs.unlink(`./uploads/${isLogo?.logo}`, (err) => {
        if (err) {
          console.error(err);
        }
      });

      res.status(200).json({
        success: true,
        message: "Logo updated successfully",
      });
    }
  } catch (error) {
    fs.unlink(`./uploads/logo/${file}`, (err) => {
      if (err) {
        console.error(err);
      }
    });

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
