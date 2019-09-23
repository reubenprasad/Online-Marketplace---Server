var mongoose = require('mongoose')
var schema = mongoose.Schema;
var catschema = new schema(
    {
    name:String,
    image:String
    }
)
var categoriesmodel = mongoose.model("Categories",catschema,"Categories");
module.exports = categoriesmodel;