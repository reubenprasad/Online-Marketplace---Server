var mongoose = require('mongoose')
var schema = mongoose.Schema;
var prodschema = new schema(
    {
    title:String,
    price:Number,
    id:Number,
    image:String,
    category:String,
    location:String,
    status:String
    }
)
var productssmodel = mongoose.model("Products",prodschema,"Products");
module.exports = productssmodel;