const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  registerCustomer,
  loginCustomer,
  forgotPassword,
  resetPassword,
} = require("../controllers/products");
const { protect, authorize } = require("../middleware/auth");
//protect,authorize('admin'),
//protect,authorize('user'),
//protect,authorize('user','admin'),
router.route("/products").post(createProduct);
// router.route("/customer/register").post(registerCustomer);
// router.route("/customer/login").post(loginCustomer);
// router.route("/customer/forgotPassword").post(forgotPassword);
// router.route("/customer/resetPassword/:resetToken").put(resetPassword);
// router
//   .route("/products/:id")
//   .get(getProduct)
//   .put(updateProduct)
//   .delete(deleteProduct);

module.exports = router;
