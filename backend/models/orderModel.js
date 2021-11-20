const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  Location : {
      type: string,
      default: "google map api"
    },
  orderServices: [
    {
      id:{
        type: mongoose.Schema.ObjectId,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
    }
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  paymentInfo: {
    id: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  paidAt: Date,

  totalPrice: Number,
  orderStatus: {
    type: String,
    required: true,
    default: "Pending",
  },
  completetedAt: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  contactMehtod: {
    type: String,
    
  }
});

module.exports = mongoose.model("Order", orderSchema);
0