var mongoose = require("mongoose");
var CategorySchema = mongoose.Schema({
    name: String,
    description: String
});
// name: string, schema?: any, collection?: string
// "category": description - optional, CategorySchema - schema, "categories" - collection name
var CategoryModel = mongoose.model("category", CategorySchema, "categories")
module.exports = CategoryModel;