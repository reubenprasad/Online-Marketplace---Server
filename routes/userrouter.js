var express = require('express')
const router = express.Router();
var bodyparser = require('body-parser')
var mongoose = require('mongoose')
var url = "mongodb+srv://reuben:1234@cluster0-fcmwh.mongodb.net/Marketplace?retryWrites=true"
var users = require("../model/user")

router.use(bodyparser.urlencoded({extended:true}))
router.use(bodyparser.json());

router.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });

mongoose.connect(url, {useNewUrlParser:true},function(err){
    if(err) 
    throw err;
    else
    console.log("database connected")
});

module.exports = router;

router.post("/signup",function(req,res){
    

    users.find({username:req.body.username},function(err,result){
    
        if(err) 
        throw err;
        else if(result.length == 0)
        {
            var u1 = new users();
            u1.username = req.body.username;
            u1.name = req.body.name;
            u1.password=req.body.password;
            u1.mobile=req.body.mobile;
            u1.email=req.body.email;
            u1.role=req.body.role;
            u1.save(function(err){
                if(err) throw err;
                else
                res.send(false)
            })
        }
        else
        {
          res.send(true);
        }
    })

});

router.post("/login",function(req,res){
    console.log(req.body)
    users.find({username:req.body.username,password:req.body.password},function(err,result){
        
        if(err) 
        throw err;
        else if(result.length == 0)
        {
          
          res.send({user:false})
        }
        else
        {
            res.send({user:true})
        }
    })
   
    });