const express = require("express");
const {
  getAllMainCategorys,
  getAllSubCategorys,
  getAllServices,
  createService,
  updateService,
  deleteService,
  getServiceDetails,
  getAdminServices,
  getAllSubCategorysWithId
} = require("../controllers/servicesController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/maincategory").get(getAllMainCategorys)
router.route("/subcategory").get(getAllSubCategorys)
router.route("/subcategory/:id").get(getAllSubCategorysWithId)
router.route("/services").get(getAllServices);

router
  .route("/admin/services")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminServices);

router
  .route("/admin/service/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createService);

router
  .route("/admin/service/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateService)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteService);

router.route("/service/:id").get(getServiceDetails);

module.exports = router;
