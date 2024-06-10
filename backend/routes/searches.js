const express = require("express");
const router = express.Router();
const searchesController = require("../controllers/searchController");

// GET searched products
router.get('/:query', searchesController.getSearchedProducts)

module.exports = router;