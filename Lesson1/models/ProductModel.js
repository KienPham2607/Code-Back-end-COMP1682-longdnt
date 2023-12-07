var mongoose = require("mongoose");
var ProductSchema = mongoose.Schema({
    name: {
        type: String,
        minLength: [3, "Product name cannot be smaller than 3 characters"],
        maxLength: 30
    },
    price: Number,
    image: String,
    category: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "category"
    }
});

var ProductModel = mongoose.model("product", ProductSchema, "products");
module.exports = ProductModel;