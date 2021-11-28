const MainCategory = require("../models/mainCategoryModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");


// Create main category
exports.createMainCategory = catchAsyncErrors(async (req,res)=>{
  req.body.createdBy = req.user.id;

  const mainCategory = await MainCategory.create(req.body);

  res.status(201).json({
    success: true,
    mainCategory,
  });
});

exports.getMainCategoryWithId = catchAsyncErrors(async (req,res)=>{
  const id = req.params.id;
  let mainCategory = await MainCategory.findById(id);
  res.status(200).json({
    success: true,
    mainCategory
  });
});

// get all main cataegoris
exports.getAllMainCategorys = catchAsyncErrors(async (req,res)=>{
  // let serices = await Service.find();
  let mainCategory = await MainCategory.find({},{"name":1});
  res.status(200).json({
    success: true,
    mainCategory
  });
});
// Get All Service
// Update service -- Admin

exports.updateMainCategory = catchAsyncErrors(async (req, res, next) => {
  const mainCategory = await MainCategory.findById(req.params.id);

  if (!mainCategory) {
    return next(new ErrorHander("Service not found", 404));
  }

  mainCategory = await MainCategory.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    service,
  });
});

// Delete service

exports.deleteSMainubCategory = catchAsyncErrors(async (req, res, next) => {
  const mainCategory = await MainCategory.findById(req.params.id);

  if (!mainCategory) {
    return next(new ErrorHander("Service not found", 404));
  }

  await mainCategory.remove();

  res.status(200).json({
    success: true,
    message: "service Delete Successfully",
  });
});
