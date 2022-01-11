const mongoose = require("mongoose");

const cryotoSchema = new mongoose.Schema({
  name:{
    type: String,
    required: [true, "Please Enter Name of Cryptocrunncy"],
  },
  symbol: {
    type: String,
    required: [true, "Please Enter Symbols"],
  },
  
});

module.exports = mongoose.model("Crypto", cryotoSchema);
