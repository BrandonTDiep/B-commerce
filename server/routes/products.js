const express = require("express");
const router = express.Router();
const productsController = require("../controllers/productController");
const requireAuth = require('../middleware/requireAuth')


// GET all products
router.get('/', productsController.getProducts)

// GET a single product
router.get('/:id', productsController.getProduct)

// POST a saved product
router.post('/', requireAuth, productsController.createSavedProduct)

module.exports = router;