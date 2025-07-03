const slugify = require("slugify");
const Categories = require("../models/categoriesModel");
const makeSlug = require("../utils/makeSlug");

exports.addCategory = async (req, res) => {
  try {
    const data = req.body;

    const category = {
      ...req?.body,
      slug: makeSlug(data?.name),
    };

    const result = await Categories.create(category);

    res.status(200).json({
      success: true,
      message: "Category created successfully",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.getCategories = async (req, res) => {
  try {
    let categories = await Categories.find({}).sort({ order: 1 });

    res.status(200).json({
      success: true,
      message: "All categories",
      data: categories,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.getCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Categories.findOne({ _id: id });

    res.status(200).json({
      success: true,
      message: "Category found successfully",
      data: category,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { id } = req?.params;
    const data = req?.body;

    const category = await Categories.findById(id);

    if (!category) {
      res.json({
        success: false,
        message: "Category not found",
      });
    }

    const slug = makeSlug(data?.name);

    const newData = {
      ...data,
      slug,
    };

    const result = await Categories.findByIdAndUpdate(id, newData, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req?.params;

    const category = await Categories.findById(id);

    if (!category) {
      res.json({
        success: false,
        message: "Category not found",
      });
    }

    const result = await Categories.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
