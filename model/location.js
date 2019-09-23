var mongoose = require('mongoose')
var schema = mongoose.Schema;
var locschema = new schema(
    {
    name:String,
    }
)
var locationsmodel = mongoose.model("Locations",locschema,"Locations");
module.exports = locationsmodel;