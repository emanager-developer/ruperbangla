const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const port = process.env.PORT || 2607;
const apiRoutes = require("./src/routes/index");
const { defaultAdminCreate } = require("./src/controllers/userController");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("uploads"));

// Connect Database
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Database connection is successful");
    defaultAdminCreate();
  })
  .catch((error) => {
    console.log("Database connection failed");
  });

// API Routes
app.use("/", apiRoutes);

app.get("/", (req, res) => {
  res.send(`Server is Running on port ${port}`);
});

app.listen(port, () => {
  console.log(`Server is Running on port ${port}`);
});
