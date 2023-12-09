var express = require("express");
var router = express.Router();
var ProductModel = require('../models/ProductModel');
var CategoryModel = require('../models/CategoryModel');

// Show all categories
// URL: localhost:3000/categories
// SQL: SELECT * FROM categories
router.get('/', async (req, res) => {
    // Get data from collection
    var productList = await ProductModel.find({}).populate('category');
    // load data    
    // res.send(productList); // Demo
    res.render("product/index", {productList}); // File location: view/product/index
});

router.get('/add', async (req, res) => {
    var categoryList = await CategoryModel.find({});
    res.render('product/add', { categoryList});
})

router.post('/add', async (req, res) => {
    var product = req.body;
    await ProductModel.create(product);
    res.redirect('/products');
})

router.get('/edit/:id', async (req, res) => {
    var id = req.params.id;
    var product = await ProductModel.findById(id);
    res.render('product/edit', { product });
})

router.post('/edit/:id', async (req, res) => {
    var id = req.params.id;
    var data = req.body;
    await ProductModel.findByIdAndUpdate(id, data);
    res.redirect('/products');
})

module.exports = router;