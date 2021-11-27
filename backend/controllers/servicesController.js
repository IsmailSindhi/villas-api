const Service = require("../models/serviceModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");

// get all main cataegoris
exports.getAllMainCategorys = catchAsyncErrors(async (req,res)=>{
  // let serices = await Service.find();
  let mainCategory = await Service.find({},{"mainCategory":1});
  res.status(200).json({
    success: true,
    mainCategory
  });
});
// get all sub cataegoris 
exports.getAllSubCategorys = catchAsyncErrors(async (req,res)=>{
  let subCategory = await Service.find({},{"subCategory":1});
  res.status(200).json({
    success: true,
    subCategory
  });
});


// get all sub cataegoris with id
exports.getAllSubCategorysWithId = catchAsyncErrors(async (req,res)=>{
  const id = req.params.id
  let mainCategory = await Service.findById(id)
  mainCategory = mainCategory.mainCategory
  let subCategory = await Service.find({mainCategory},{"subCategory":1});
  res.status(200).json({
    success: true,
    mainCategory,
    subCategory
  });
});

// setapprove status
exports.setAppove = catchAsyncErrors(async (req, res) => {
  let service = await Service.findById(req.params.id);

  if (!service) {
    return next(new ErrorHander("Service not found", 404));
  }  
  Service.methods.setAppove(true);
  res.status(200).json({
    success: true,
    service,
  });
});


// Create Service -- Admin
exports.createService = catchAsyncErrors(async (req, res, next) => {
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "services",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
  req.body.user = req.user.id;

  const service = await Service.create(req.body);
  console.log(service);
  res.status(201).json({
    success: true,
    service,
  });
});

// Get All Service
// http:locolhost:4000/api/v1/services?keywork = paint
exports.getAllServices = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 10;
  const servicesCount = await Service.countDocuments();

  const apiFeature = new ApiFeatures(Service.find(), req.query)
    .search()
    .filter();

  let services = await apiFeature.query;

  let filteredServicesCount = services.length;

  apiFeature.pagination(resultPerPage);

  services = await apiFeature.query;

  res.status(200).json({
    success: true,
    services,
    servicesCount,
    resultPerPage,
    filteredServicesCount,
  });
});

// Get All Service (Admin)
exports.getAdminServices = catchAsyncErrors(async (req, res, next) => {
  const services = await Service.find();

  res.status(200).json({
    success: true,
    services,
  });
});

// Get Service Details
exports.getServiceDetails = catchAsyncErrors(async (req, res, next) => {
  const service = await Service.findById(req.params.id);

  if (!service) {
    return next(new ErrorHander("Service not found", 404));
  }

  res.status(200).json({
    success: true,
    service,
  });
});

// Update service -- Admin

exports.updateService = catchAsyncErrors(async (req, res, next) => {
  let service = await Service.findById(req.params.id);

  if (!service) {
    return next(new ErrorHander("Service not found", 404));
  }

  // Images Start Here
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    // Deleting Images From Cloudinary
    for (let i = 0; i < service.images.length; i++) {
      await cloudinary.v2.uploader.destroy(service.images[i].public_id);
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "services",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }

  service = await Service.findByIdAndUpdate(req.params.id, req.body, {
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

exports.deleteService = catchAsyncErrors(async (req, res, next) => {
  const service = await Service.findById(req.params.id);

  if (!service) {
    return next(new ErrorHander("Service not found", 404));
  }

  // Deleting Images From Cloudinary
  for (let i = 0; i < service.images.length; i++) {
    await cloudinary.v2.uploader.destroy(service.images[i].public_id);
  }

  await service.remove();

  res.status(200).json({
    success: true,
    message: "service Delete Successfully",
  });
});
