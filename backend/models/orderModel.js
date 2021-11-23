const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  idForMainCatagory:{
    type: mongoose.ObjectId
  },
  idForSubCatagory:{
    type: mongoose.ObjectId
  },
  location : {
      type: String,
      default: "google map api"
    },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  // paymentInfo: {
  //   id: {
  //     type: String,
  //     required: true,
  //   },
  //   status: {
  //     type: String,
  //     required: true,
  //   },
  // },
  // paidAt: Date,

  // totalPrice: Number,
  orderStatus: {
    type: String,
    default: "Pending",
  },
  // completetedAt: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  contactMehtod: {
    type: String,
    
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
  description:{
    type: String,
    default: "desciption empty"
  },
  address:{
    type: String,
   
  }
});

module.exports = mongoose.model("Order", orderSchema);
