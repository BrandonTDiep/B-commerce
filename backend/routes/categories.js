const express = require("express");
const router = express.Router();
const categoriesController = require("../controllers/categoryController");

// GET all categories
router.get('/', categoriesController.getCategories)

// GET a single category
router.get('/:category', categoriesController.getCategory)

module.exports = router;