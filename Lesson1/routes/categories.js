var express = require("express");
var router = express.Router();
var CategoryModel = require('../models/CategoryModel');
// Show all categories
// URL: localhost:3000/categories
// SQL: SELECT * FROM categories
router.get('/', async (req, res) => {
    // Get data from collection
    var categoryList = await CategoryModel.find({});
    // load data
    res.send(categoryList); // Demo
});

module.exports = router;