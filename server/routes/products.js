const express = require("express");
const router = express.Router();
const productsController = require("../controllers/productController");


//create instance of router 

// GET all products
router.get('/', productsController.getProducts)

// GET a single product
router.get('/:id', productsController.getProduct)

// POST a saved product
router.post('/', productsController.createSavedProduct)

module.exports = router;