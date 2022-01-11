const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  MainCatagory:{
    _id : mongoose.ObjectId,
    name : String,
  },
  SubCatagory:[{
    
    _id : mongoose.ObjectId,
  }
  ],
  
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
 
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
  completetedAt: {
    type: Date,
  },

  contactMehtod: {
    type: String,
    
  },
  // images: [
  //   {
  //     public_id: {
  //       type: String,
  //       // required: true,
  //     },
  //     url: {
  //       type: String,
  //       // required: true,
  //     },
  //   },
  // ],
  description:{
    type: String,
    default: "desciption empty"
  },
  address:{
    street: String,
    house: String,
    town: String,
    province: String,
    postcode: String,
   
  }
});

module.exports = mongoose.model("Order", orderSchema);
