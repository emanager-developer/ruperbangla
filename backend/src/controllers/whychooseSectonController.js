const WhyChooseSection = require("../models/whychooseSectonModel");

exports.addWhyChooseSection = async (req, res) => {
  try {
    const isExist = await WhyChooseSection.findOne();
    if (isExist) {
      return res.status(400).json({
        success: false,
        message: "WhyChooseSection already exists",
      });
    }

    const result = await WhyChooseSection.create(req.body);

    res.status(200).json({
      success: true,
      message: "WhyChooseSection created successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateWhyChooseSection = async (req, res) => {
  const data = req?.body;
  const whyChooseSectionId = req.params.id;

  try {
    const whyChooseSection = await WhyChooseSection.findById(whyChooseSectionId);

    if (!whyChooseSection) {
      return res.status(400).json({
        success: false,
        message: "WhyChooseSection not found",
      });
    }

    const updatedWhyChooseSection = await WhyChooseSection.findByIdAndUpdate(whyChooseSectionId, data, { new: true });

    res.status(200).json({
      success: true,
      message: "WhyChooseSection updated successfully",
      data: updatedWhyChooseSection,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

exports.getWhyChooseSection = async (req, res) => {
  try {
    const whyChooseSection = await WhyChooseSection.findOne({});

    res.status(200).json({
      success: true,
      message: "All whyChooseSection",
      data: whyChooseSection,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
