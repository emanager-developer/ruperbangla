const MoreAbout = require("../models/moreAboutModel");
const makeSlug = require("../utils/makeSlug");

exports.add = async (req, res) => {
  const data = req?.body;

  const newData = {
    ...data,
    slug: makeSlug(data?.title),
  };

  try {
    const result = await MoreAbout.create(newData);

    return res.status(201).json({
      success: true,
      message: `${data?.title} created successfully`,
      data: result,
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
};

exports.get = async (req, res) => {
  try {
    const result = await MoreAbout.find({});

    res.status(200).json({
      success: true,
      message: "More About fetched successfully",
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
    const result = await MoreAbout.findById(id);

    if (!result) {
      return res.json({
        success: false,
        message: "More About not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "More About fetched successfully",
      data: result,
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
};

exports.getBySlug = async (req, res) => {
  const slug = req?.params?.slug;

  try {
    const result = await MoreAbout.findOne({ slug: slug });

    if (!result) {
      return res.json({
        success: false,
        message: "More About not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "More About fetched successfully",
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
  const data = req?.body;

  try {
    const isExit = await MoreAbout.findById(id);

    if (!isExit) {
      return res.json({
        success: false,
        message: "More About not found",
      });
    }

    const result = await MoreAbout.findByIdAndUpdate(
      id,
      {
        ...data,
        slug: makeSlug(data?.title),
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: `${data?.title} updated successfully`,
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.destroy = async (req, res) => {
  const id = req?.params?.id;

  try {
    const isExit = await MoreAbout.findById(id);

    if (!isExit) {
      return res.json({
        success: false,
        message: `${isExit?.title} not found!`,
      });
    }

    const result = await MoreAbout.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: `${isExit?.title} deleted successfully`,
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
