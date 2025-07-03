const bcrypt = require("bcrypt");
const { createJsonWebToken } = require("../utils/jsonWebToken");
const Administrator = require("../models/administratorModal");

exports.addAdministrator = async (req, res) => {
  const data = req?.body;

  try {
    const result = await Administrator.create(data);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Administrator not added",
      });
    }

    res.status(201).json({
      success: true,
      message: "Administrator added successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.defaultAdminCreate = async (req, res) => {
  try {
    const isExists = await Administrator.findOne({
      email: "admin@example.com",
    });

    if (!isExists) {
      const admin = new Administrator({
        name: "Default Admin",
        username: "admin",
        phone: "00000000000",
        email: "admin@example.com",
        password: "12345678",
      });

      await admin.save();
      console.log("Default admin user created successfully");
    }
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.adminLogin = async (req, res) => {
  const data = req?.body;
  try {
    const { username, password } = data;

    if (!username || !password) {
      return res.status(404).json({
        success: false,
        message: "You are not authorized! Please provide username and password",
      });
    }

    const admin = await Administrator.findOne({ username: username });

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "You are not authorized!",
      });
    }

    const isMatch = await bcrypt.compare(password, admin?.password);

    if (!isMatch) {
      return res.status(404).json({
        success: false,
        message: "Username or password is incorrect",
      });
    }

    let accessToken = createJsonWebToken({ username, password }, "6h");

    res.status(200).json({
      success: true,
      message: "You are logged in successfully",
      token: accessToken,
      data: admin,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteAdmin = async (req, res) => {
  try {
    const result = await Administrator.findByIdAndDelete(req?.params?.id);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Administrator not deleted",
      });
    }

    res.status(200).json({
      success: true,
      message: "Administrator deleted successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAdmins = async (req, res) => {
  try {
    const result = await Administrator.find({});

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Administrators not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "All administrators",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getLoggedAdmin = async (req, res) => {
  try {
    const user = await Administrator.findOne({
      username: req.user.username,
    });

    if (user) {
      res.status(200).json({
        success: true,
        data: user,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "user not found",
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
