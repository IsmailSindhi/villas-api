const express = require("express");
const {
  getAllMainCategorys,
  getMainCategoryWithId,
  createMainCategory,
  updateMainCategory,
  deleteSMainubCategory,
  
} = require("../controllers/mainCategoryController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

// Main Category route

// Get All Main Categories
router.route("/maincategory").get(getAllMainCategorys)

// Get Single Main Categories with id
router.route("/maincategory/:id").get(getMainCategoryWithId)

// create main category
router
  .route("/admin/maincategory/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createMainCategory);

  // Update and Delete Single Main Categories
  router
  .route("/admin/subcategory/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateMainCategory)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteSMainubCategory);

module.exports = router;
