const express = require("express");
const ProductModel = require("../models/ProductModel");
var router = express.Router();

router.get("/", async (req, res) => {
	try {
		var products = await ProductModel.find();
		// console.log(products);
		res.status(200).json(products); // 200: OK
	} catch (error) {
		// console.log(error);
		res.status(400).send("Load data failed! " + error);
	}
});

router.get("/:id", async (req, res) => {
	try {
		var product = await ProductModel.findById(req.params.id);
		// console.log(products);
		res.status(200).json(product); // 200: OK
	} catch (error) {
		// console.log(error);
		res.status(400).send("Load data failed! " + error);
	}
});

router.delete("/:id", async (req, res) => {
	try {
		var product = await ProductModel.findById(req.params.id);
		if (product) {
			await ProductModel.deleteOne(product);
			res.status(200).send("Deleted successfully");
		} else {
			res.send("Product not found!");
		}
	} catch (error) {
		res.status(400).send("Deletion failed! " + error);
	}
});

router.post("/add", async (req, res) => {
	var product = req.body;
	await ProductModel.create(product);
	res.status(201).send("Add successfully!");
});

router.put("/edit/:id", async (req, res) => {
	await ProductModel.findByIdAndUpdate(req.params.id, req.body);
	res.status(200).send("Edited successfully");
});

module.exports = router;
