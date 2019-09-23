var express = require('express')
const router = express.Router();
const path = require('path');
var bodyparser = require('body-parser')
var mongoose = require('mongoose')
var url = "mongodb+srv://reuben:1234@cluster0-fcmwh.mongodb.net/Marketplace?retryWrites=true"
var categories = require("../model/category"); 
var products = require("../model/product");
var locations = require("../model/location")

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

router.get("/",function(req,res){
    categories.find({},function(err,result){      
      res.send(result)
    })
})

router.get("/view/:img",function(req,res){    
  res.sendFile(path.join(__dirname+"../../public/images/"+req.params.img))
})

router.get("/products/:cat",function(req,res){
  products.find({category:req.params.cat,status:"available"},function(err,result){
      res.send(result)
   })    
})

router.get("/loc",function(req,res){
  locations.find({},function(err,result){      
    res.send(result)
  })
})

router.post("/filter",function(req,res){
      if((req.body.location == null ||req.body.location == "All Locations") && req.body.search == null)
        {
          if(req.body.filter == 0)
          {
            products.find({category:req.body.category,status:"available"},function(err,result){
              res.send(result)
            })
          }
            else if(req.body.filter == 1)
            {
              products.find({category:req.body.category,status:"available"},function(err,result){
                res.send(result)
              }).sort({price : 1})
            }
            else if(req.body.filter == 2)
            {
              products.find({category:req.body.category,status:"available"},function(err,result){
                res.send(result)
              }).sort({price : -1})
            }
            else if(req.body.filter == 3)
            {
              products.find({category:req.body.category,status:"available"},function(err,result){
                res.send(result)
              }).sort({id : -1})
            }
        }
      else if(req.body.location != null && req.body.search == null) 
      {
          if(req.body.filter == 0)
          {
            products.find({category:req.body.category,location:req.body.location,status:"available"},function(err,result){
              res.send(result)
            })
          }
          else if(req.body.filter == 1)
            {
              products.find({category:req.body.category,location:req.body.location,status:"available"},function(err,result){
                res.send(result)
              }).sort({price : 1})
            }
         else if(req.body.filter == 2)
            {
              products.find({category:req.body.category,location:req.body.location,status:"available"},function(err,result){
                res.send(result)
              }).sort({price : -1})
            }
         else if(req.body.filter == 3)
            {
              products.find({category:req.body.category,location:req.body.location,status:"available"},function(err,result){
                res.send(result)
              }).sort({id : -1})
            }
      }
      else if((req.body.location == null ||req.body.location == "All Locations") && req.body.search != null) 
      {
        if(req.body.filter == 0)
        {
          products.find({category:req.body.category,status:"available",title:{ $regex: new RegExp(req.body.search.toLowerCase(), "i") }},function(err,result){
            res.send(result)
          })
        }
        else if(req.body.filter == 1)
            {
              products.find({category:req.body.category,status:"available",title:{ $regex: new RegExp(req.body.search.toLowerCase(), "i") }},function(err,result){
                res.send(result)
              }).sort({price : 1})
            }
        else if(req.body.filter == 2)
            {
              products.find({category:req.body.category,status:"available",title:{ $regex: new RegExp(req.body.search.toLowerCase(), "i") }},function(err,result){
                res.send(result)
              }).sort({price : -1})
            }   
        else if(req.body.filter == 3)
            {
              products.find({category:req.body.category,status:"available",title:{ $regex: new RegExp(req.body.search.toLowerCase(), "i") }},function(err,result){
                res.send(result)
              }).sort({id : -1})
            }   
      }
      else if(req.body.location != null && req.body.search != null) 
      {
        if(req.body.filter == 0)
        {
          products.find({category:req.body.category,status:"available",location:req.body.location,title:{ $regex: new RegExp(req.body.search.toLowerCase(), "i") }},function(err,result){
            res.send(result)
          })
        }
        else if(req.body.filter == 1)
            {
              products.find({category:req.body.category,status:"available",location:req.body.location,title:{ $regex: new RegExp(req.body.search.toLowerCase(), "i") }},function(err,result){
                res.send(result)
              }).sort({price : 1})
            }
        else if(req.body.filter == 2)
            {
              products.find({category:req.body.category,status:"available",location:req.body.location,title:{ $regex: new RegExp(req.body.search.toLowerCase(), "i") }},function(err,result){
                res.send(result)
              }).sort({price : -1})
            }   
        else if(req.body.filter == 3)
            {
              products.find({category:req.body.category,status:"available",location:req.body.location,title:{ $regex: new RegExp(req.body.search.toLowerCase(), "i") }},function(err,result){
                res.send(result)
              }).sort({id : -1})
            }   
      }
  })

router.get("/singleproduct/:id",function(req,res){
    products.find({_id:req.params.id},function(err,result){
        res.send(result)
     })    
  })

router.get("/sellerproductsA/:user",function(req,res){
    products.find({seller:req.params.user,status:"available"},function(err,result){
      res.send(result);
   })  
  })

router.get("/sellerproductsS/:user",function(req,res){
    products.find({seller:req.params.user,status:"sold"},function(err,result){
      res.send(result);
   })  
  })
  
