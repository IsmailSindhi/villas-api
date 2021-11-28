const mongoose = require("mongoose");

const mainCategorySchema = new mongoose.Schema({
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

module.exports = mongoose.model("MainCategory", mainCategorySchema);
