const express = require("express");
const router = express.Router();
const productControllers = require("../controllers/productController");
//const internControllers = require("../controllers/internController");



;
router.post("/createProduct", productControllers.createProduct)
router.put("/updatePrice", productControllers.updatePrice)
router.get("/api.storerestapi.com/products/:product_id", productControllers.GetProductWithPrice);
router.get("/ProductPriceInXL", productControllers.GetXL)
//router.get('/collegeDetails',collegeControllers.getCollegeDetails)


module.exports = router;
