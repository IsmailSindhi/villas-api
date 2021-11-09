const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter service Name"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please Enter service Description"],
  },
  price: {
    type: Number,
    required: [true, "Please Enter service Price"],
    maxLength: [8, "Price cannot exceed 8 characters"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  mainCategory: {
    type: String,
    required: [true, "Please Enter service Category"],
  },
  subCategory: {
    type: String,
    required: [true, "Please Enter service SubCategory"],
  },
  available: {
    type: Boolean,
    default: true,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],

  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  approvedByAdmin : {
    type : Boolean,
    default : false,
  },
});

// serviceSchema.methods.setApprove = function (value) {
//   this.approvedByAdmin = value
// }



module.exports = mongoose.model("Service", serviceSchema);
