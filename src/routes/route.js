const express = require("express");
const router = express.Router();
const productControllers = require("../controllers/productController");




;
router.post("/api.storerestapi.com/products/createProduct", productControllers.createProduct)
router.put("/api.storerestapi.com/products/updatePrice", productControllers.updatePrice)
router.get("/api.storerestapi.com/products/:product_id", productControllers.GetProductWithPrice);
router.get("/ProductPriceInXL", productControllers.GetXL)



module.exports = router;
