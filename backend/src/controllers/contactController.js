const Contact = require("../models/contactModel");

exports.addContact = async (req, res) => {
  try {
    const isExist = await Contact.findOne();
    if (isExist) {
      return res.status(400).json({
        success: false,
        message: "Contact already exists",
      });
    }

    const result = await Contact.create(req.body);

    res.status(200).json({
      success: true,
      message: "Contact created successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateContact = async (req, res) => {
  const data = req?.body;
  const contactId = req.params.id;

  try {
    const contact = await Contact.findById(contactId);

    if (!contact) {
      return res.status(400).json({
        success: false,
        message: "Contact not found",
      });
    }
    const updatedContact = await Contact.findByIdAndUpdate(contactId, data, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "Contact updated successfully",
      data: updatedContact,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.findOne({});

    res.status(200).json({
      success: true,
      message: "All contacts",
      data: contacts,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
