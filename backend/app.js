const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const path = require("path");

const errorMiddleware = require("./middleware/error");

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

// Route Imports
const user = require("./routes/userRoute");
const crypto = require("./routes/cryptoRoute");
const service = require("./routes/servicesRoute")
const order = require("./routes/orderRoute")
const mainCategory = require("./routes/mainCategoryRoute")
const subCategory = require("./routes/subCategoryRoute")

app.use("/api/v1", mainCategory);
app.use("/api/v1", subCategory);
app.use("/api/v1", user);
app.use("/api/v1", crypto);
app.use("/api/v1", service);
app.use("/api/v1", order);

app.get("*", (req, res) => {
  res.send({"message": "welcome to villas api"});
});


// app.use(express.static(path.join(__dirname, "../frontend/build")));

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
// });


// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;
