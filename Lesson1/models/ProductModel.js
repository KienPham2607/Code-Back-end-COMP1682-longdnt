var mongoose = require("mongoose");
var ProductSchema = mongoose.Schema({
    name: {
        type: String,
        minLength: [3, "Product name cannot be smaller than 3 characters"],
        maxLength: 30
    },
    price: {
        type: Number,
        min: [0, "Price must be larger than 0"]
    },
    image: String,
    category: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "category"
    }
});

var ProductModel = mongoose.model("product", ProductSchema, "products");
module.exports = ProductModel;