const express = require("express");
const router = express.Router();
const Product = require("../models/products")
const productsController = require("../controllers/productController");


//create instance of router 

// GET all products

router.get('/', productsController.getProducts)

// GET a single product
router.get('/:id', productsController.getProduct)

module.exports = router;