var mongoose = require('mongoose')
var schema = mongoose.Schema;
var userschema = new schema(
    {
    username:String,
    password:String,
    name:String,
    mobile:Number,
    email:String,
    }
)
var usersmodel = mongoose.model("Users",userschema,"Users");
module.exports = usersmodel;