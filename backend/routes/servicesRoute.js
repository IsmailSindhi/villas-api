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
} = require("../controllers/servicesController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/maincategorys").get(getAllMainCategorys)
router.route("/subcategorys").get(getAllSubCategorys)
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
