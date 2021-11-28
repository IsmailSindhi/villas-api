const express = require("express");
const {
  getAllSubCategorys,
  getAllSubCategorysWithId,
  createSubCategory,
  updateSubCategory,
  deleteSubCategory
  
} = require("../controllers/subCategoryController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

  // // Sub Category route

  // Get All sub categories
  router.route("/subcategory").get(getAllSubCategorys)
  // Get All subcatogories with id of  main category
  router.route("/subcategory/:id").get(getAllSubCategorysWithId)
  
  
  router
  .route("/admin/subcategory/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createSubCategory);
  
  
  // Update and Delete Single sub Categories
  router
  .route("/admin/subcategory/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateSubCategory)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteSubCategory);

module.exports = router;
