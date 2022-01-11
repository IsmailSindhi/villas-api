const Crypto = require("../models/cryptoModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");


// Create main category
exports.createCrypto = catchAsyncErrors(async (req,res)=>{

  const Cryptocrunncy = await Crypto.create(req.body);

  res.status(201).json({
    success: true,
    Cryptocrunncy,
  });
});

exports.getAllSymbols =  catchAsyncErrors(async (req,res)=>{
    
    const Cryptocrunncy = await Crypto.find();
  
    res.status(200).json({
      success: true,
      Cryptocrunncy,
    });
  });


  
exports.deleteCrypto = catchAsyncErrors(async (req, res, next) => {
    const Cryptocrunncy = await Crypto.findById(req.params.id);
  
    if (!Cryptocrunncy) {
      return next(new ErrorHander("Service not found", 404));
    }
  
    await Cryptocrunncy.remove();
  
    res.status(200).json({
      success: true,
      message: "service Delete Successfully",
    });
  });
  