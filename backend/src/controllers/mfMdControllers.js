const fs = require("fs");
const MFMd = require("../models/mfMdModel");

exports.createMFMd = async (req, res) => {
  const image = req?.file.filename;
  const data = req?.body;

  const aboutUs = {
    ...data,
    image: `/director/${image}`,
  };

  try {
    if (!image) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    const isExist = await MFMd.findOne();
    if (isExist) {
      fs.unlink(`./uploads/director/${image}`, (err) => {
        if (err) {
          console.log(err);
        }
      });

      return res.status(400).json({
        success: false,
        message: "Message from Md already exists",
      });
    }

    const result = await MFMd.create(aboutUs);

    res.status(201).json({
      success: true,
      message: "Message from Md created successfully",
      data: result,
    });
  } catch (err) {
    fs.unlink(`./uploads/director/${image}`, (err) => {
      if (err) {
        console.log(err);
      }
    });

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.getMFMd = async (req, res) => {
  try {
    const result = await MFMd.findOne();

    res.status(200).json({
      success: true,
      message: "Message from Md fetched successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.updateMFMd = async (req, res) => {
  const id = req?.params?.id;
  const image = req.file?.filename || null;
  const data = req?.body;

  try {
    const isExist = await MFMd.findById(id);

    if (!isExist) {
      if (image) {
        fs.unlink(`./uploads/${image}`, (err) => {
          if (err) {
            console.error(err);
            return;
          }
        });
      }

      return res.status(404).json({
        success: false,
        message: "Message from Md not found",
      });
    }

    let newData = {
      ...data,
    };

    if (image) {
      fs.unlink(`./uploads/${isExist?.image}`, (err) => {
        if (err) {
          console.error(err);
          return;
        }
      });

      newData = {
        ...data,
        image: `/director/${image}` || isExist?.image,
      };
    }

    const result = await MFMd.findByIdAndUpdate(id, newData, {
      new: true,
    });

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Message from Md not updated",
      });
    }

    res.status(200).json({
      success: true,
      message: "Message from Md updated successfully",
      data: result,
    });

    if (image) {
      fs.unlink(`./uploads/${isExist?.image}`, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }
  } catch (error) {
    fs.unlink(`./uploads/director/${image}`, (err) => {
      if (err) {
        console.log(err);
      }
    });

    res.status(500).json({
      success: false,
      message: error.message,
      error,
    });
  }
};
