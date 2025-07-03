const Counter = require("../models/counterModel");
const fs = require("fs");

exports.add = async (req, res) => {
  const data = req?.body;
  const image = req?.file?.filename;

  console.log(data);

  try {
    const isExist = await Counter.findOne({});

    if (isExist) {
      if (image) {
        fs.unlink(`./uploads/counter/${image}`, (err) => {
          if (err) {
            console.error(err);
            return;
          }
        });
      }
      return res.json({
        success: false,
        message: "Counter already added",
      });
    }

    if (!image) {
      return res.json({
        success: false,
        message: "Bg Image is required",
      });
    }

    const result = await Counter.create({
      ...data,
      bgImage: `counter/${image}`,
      counts: JSON.parse(data?.counts),
    });

    if (!result)
      return res.json({
        success: false,
        message: "Counter not added",
      });

    res.status(200).json({
      success: true,
      message: "Counter added successfully",
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
  const id = req?.params?.id;
  const data = req?.body;
  const image = req?.file?.filename;

  try {
    const isExist = await Counter.findById(id);

    if (!isExist) {
      if (image) {
        fs.unlink(`./uploads/counter/${image}`, (err) => {
          if (err) {
            console.error(err);
            return;
          }
        });
      }

      return res.json({
        success: false,
        message: "Counter not found",
      });
    }

    const newData = {
      ...data,
      counts: JSON.parse(data?.counts),
      bgImage: image ? `counter/${image}` : isExist?.bgImage,
    };

    const result = await Counter.findByIdAndUpdate(id, newData, { new: true });

    res.status(200).json({
      success: true,
      message: "WhyChoose updated successfully",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAll = async (req, res) => {
  try {
    const counter = await Counter.findOne({});

    res.status(200).json({
      success: true,
      message: "Counter's found successfully",
      data: counter,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error?.message,
    });
  }
};
