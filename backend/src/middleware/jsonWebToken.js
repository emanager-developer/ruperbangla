const jwt = require("jsonwebtoken");

exports.createJsonWebToken = (payload, expiresTime) => {
  if (!payload || typeof payload !== "object") {
    throw new Error("Payload must be a non-empty object");
  }

  if (!process.env.JWT_SECRET_KEY) {
    throw new Error("JWT_SECRET_KEY is not defined in environment variables");
  }

  try {
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: expiresTime,
    });
    return token;
  } catch (error) {
    console.error("Error creating JWT:", error);
    throw new Error("Could not create the token");
  }
};
