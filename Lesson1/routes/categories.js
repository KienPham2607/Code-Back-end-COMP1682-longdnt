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
    // res.send(categoryList); // Demo
    res.render("category/index", {categoryList});
});

router.get('/delete/:id', async (req, res) => {
    // Get value from URL: req.params
    var id = req.params.id;
    await CategoryModel.findByIdAndDelete(id);
    res.redirect("/categories");
})

router.get("/add", (req, res) => {
    res.render("category/add");
})

router.post("/add", async (req, res) => {
    // Get value from form: req.body
    var category = req.body;
    await CategoryModel.create(category);
    res.redirect("/categories");
})

router.get("/edit:id", async (req, res) => {
    var id = req.params.id;
    var category = await CategoryModel.findById(id);
    res.render("category/edit", {category});
})

router.post("/edit", async (req, res) => {
    // Get value from form: req.body
    var category = req.body;
    await CategoryModel.create(category);
    res.redirect("/categories");
})

module.exports = router;