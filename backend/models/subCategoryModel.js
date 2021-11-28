const mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema({
  idOfMainCategory : {
    type: mongoose.Schema.ObjectId,
    ref: "MainCategory",
    required: true,
  },
  name:{
    type: String,
    required: [true, "Please Enter service main Category"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  }
});

module.exports = mongoose.model("SubCategory", subCategorySchema);
