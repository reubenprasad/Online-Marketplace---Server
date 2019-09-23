var mongoose = require('mongoose')
var schema = mongoose.Schema;
var prodschema = new schema(
    {
    title:String,
    price:Number,
   /*  pid:String, */
    image:String,
    category:String,
    location:String,
    status:String,
    seller:String,
    addedon:Date
    }
)
var productssmodel = mongoose.model("Products",prodschema,"Products");
module.exports = productssmodel;