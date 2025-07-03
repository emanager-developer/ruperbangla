const fs = require("fs");
const HighlightProject = require("../models/highlightProjectModel");

exports.createProject = async (req, res) => {
  const image = req?.file?.filename;
  const data = req?.body;

  const highlightProject = {
    ...data,
    image: `/highlightProject/${image}`,
  };

  try {
    const isExist = await HighlightProject.findOne();
    if (isExist) {
      fs.unlink(`./uploads/highlightProject/${image}`, (err) => {
        if (err) {
          console.log(err);
        }
      });

      return res.status(400).json({
        success: false,
        message: "highlightProject already exists",
      });
    }

    const result = await HighlightProject.create(highlightProject);

    res.status(201).json({
      success: true,
      message: "highlightProject created successfully",
      data: result,
    });
  } catch (err) {
    fs.unlink(`./uploads/highlightProject/${image}`, (err) => {
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

exports.getProject = async (req, res) => {
  try {
    const result = await HighlightProject.findOne();

    res.status(200).json({
      success: true,
      message: "highlightProject fetched successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.updateProject = async (req, res) => {
  const id = req?.params?.id;
  const image = req?.file?.filename;
  const data = req?.body;

  try {
    const isExist = await HighlightProject.findById(id);

    if (!isExist) {
      fs.unlink(`./uploads/highlightProject/${image}`, (err) => {
        if (err) {
          console.log(err);
        }
      });
      return res.status(404).json({
        success: false,
        message: "Highlight Project not found",
      });
    }

    let newData;

    if (image) {
      fs.unlink(`./uploads/${isExist?.image}`, (err) => {
        if (err) {
          console.log(err);
        }
      });

      newData = {
        ...data,
        image: `/highlightProject/${image}`,
      };
    } else {
      newData = { ...data, image: isExist?.image };
    }

    const result = await HighlightProject.findByIdAndUpdate(id, newData, {
      new: true,
    });

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "highlightProject not updated",
      });
    }

    res.status(200).json({
      success: true,
      message: "highlightProject updated successfully",
      data: result,
    });
  } catch (error) {
    fs.unlink(`./uploads/highlightProject/${image}`, (err) => {
      if (err) {
        console.log(err);
      }
    });
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
