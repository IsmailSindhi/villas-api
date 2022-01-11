const express = require("express");
const {
    getAllSymbols,
    deleteCrypto,
    createCrypto  
} = require("../controllers/cryptoController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

// Main Category route

// Get All Symbols
router.route("/getAllSymbols").get(getAllSymbols)

// create cypto
router
  .route("/admin/crypto/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createCrypto);

  // Delete Single Main Categories
  router
  .route("/admin/crypto/:id")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteCrypto);

module.exports = router;
