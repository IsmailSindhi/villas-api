const SubCategory = require("../models/subCategoryModel");
const MainCategory = require("../models/mainCategoryModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// Create Sub categoty
exports.createSubCategory = catchAsyncErrors(async (req,res)=>{
  req.body.createdBy = req.user.id;
  const subCategory = await SubCategory.create(req.body)
  res.status(201).json({
    success: true,
    subCategory,
  });
});

// get all sub cataegoris 
exports.getAllSubCategorys = catchAsyncErrors(async (req,res)=>{
  let subCategory = await SubCategory.find({},{"name":1,"idOfMainCategory":1});
  res.status(200).json({
    success: true,
    subCategory
  });
});


// get all sub cataegoris with id
exports.getAllSubCategorysWithId = catchAsyncErrors(async (req,res)=>{
  const idOfMainCategory = req.params.id
  let mainCategory = await MainCategory.findById(idOfMainCategory)
  mainCategory = mainCategory.name
  let subCategory = await SubCategory.find({idOfMainCategory},{"name":1});
  res.status(200).json({
    success: true,
    mainCategory,
    subCategory
  });
});

  exports.updateSubCategory = catchAsyncErrors(async (req, res, next) => {
  const subCategory = await SubCategory.findById(req.params.id);

  if (!subCategory) {
    return next(new ErrorHander("Service not found", 404));
  }

  subCategory = await SubCategory.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    subCategory,
  });
});

  // Delete service
  
exports.deleteSubCategory = catchAsyncErrors(async (req, res, next) => {
  const subCategory = await SubCategory.findById(req.params.id);

  if (!subCategory) {
    return next(new ErrorHander("Service not found", 404));
  }

  await subCategory.remove();

  res.status(200).json({
    success: true,
    message: "service Delete Successfully",
  });
});
