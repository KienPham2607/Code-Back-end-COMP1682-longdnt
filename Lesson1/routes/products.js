var express = require("express");
var router = express.Router();
var ProductModel = require('../models/ProductModel');
// Show all categories
// URL: localhost:3000/categories
// SQL: SELECT * FROM categories
router.get('/', async (req, res) => {
    // Get data from collection
    var productList = await ProductModel.find({});
    // load data
    // res.send(productList); // Demo
    res.render("product/index", {productList}); // File location: view/product/index
});

module.exports = router;