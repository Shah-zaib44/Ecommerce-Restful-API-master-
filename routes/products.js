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
  resetPassword
} = require("../controllers/products");
const {protect,authorize}=require('../middleware/auth')
//protect,authorize('admin'),
router.route("/products").get(getProducts).post(createProduct);
router.route("/customer/register").post(registerCustomer);
router.route("/customer/login").post(loginCustomer);
router.route("/customer/forgotPassword").post(forgotPassword);
router.route("/customer/resetPassword/:resetToken").put(resetPassword);
router.route("/products/:id").get(getProduct).put(protect,authorize('user','admin'),updateProduct).delete(protect,authorize('user'),deleteProduct);

module.exports = router;
