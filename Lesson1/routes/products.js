var express = require("express");
var router = express.Router();
var ProductModel = require('../models/ProductModel');
var CategoryModel = require('../models/CategoryModel');
const { Model } = require("mongoose");

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
    try {
        var product = req.body;
        await ProductModel.create(product);
        res.redirect('/products');
    }
    catch (err) {
        if (err.name === 'ValidationError') {
            let  InputErrors= {};
            for (let field in err.errors) {
                InputErrors[field] = err.errors[field].message;
            }
            res.render('product/add', { InputErrors, product });
        }
    }
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

router.post('/search', async (req, res) => {
    var kw = req.body.keyword;
    /* 
    * "kw": This is the regular expression pattern. It's looking for a string that matched 
    * "i": This is a flag indicating that the regular expression is case-insensitive. So, it will match patterns regardless of whether the characters are uppercase or lowercase.
    */
    var productList = await ProductModel.find({name: RegExp(kw, 'i')}); 
    res.render('product/index', {productList});
})

module.exports = router;