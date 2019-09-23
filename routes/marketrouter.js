var express = require('express')
const router = express.Router();
const path = require('path');
var multer = require('multer');
var bodyparser = require('body-parser')
var mongoose = require('mongoose')
var url = "mongodb+srv://reuben:1234@cluster0-fcmwh.mongodb.net/Marketplace?retryWrites=true"
var categories = require("../model/category"); 
var products = require("../model/product");
var locations = require("../model/location")

var storage =   multer.diskStorage({  
  destination: (req, file, callback)=>{  
    callback(null, './public/images');  
  },  
  filename: (req, file, callback)=>{  
    callback(null, file.originalname);  
  }  
});  
var upload = multer({ storage : storage}).single('image');

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
              }).sort({addedon : -1})
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
              }).sort({addedon : -1})
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
              }).sort({addedon : -1})
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
              }).sort({addedon : -1})
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

  router.post("/add",upload, function(req,res){
    let count;
    if(req.body.title!=undefined){
      /* products.countDocuments({},function(err,result){
      count = (parseInt(result) + 1).toString();
      console.log(count);
       }) */
     var p = new products();
     p.title = req.body.title;
     p.price = req.body.price;
     p.category = req.body.category;
     p.location = req.body.location;
     p.seller = req.body.seller;
     p.image = req.body.image;
    /*  p.pid = count; */
     p.status = "available";
     p.addedon = new Date();
     p.save(function(err){
        if (err) throw err;
        else{
            console.log("Added");
            
        }
    })
    }
    })

    router.get("/marksold/:id",function(req,res){
      products.updateOne({_id:req.params.id} ,{$set: {status:"sold"}}, function(err,result){
        if (err) throw err;
        else{
          res.send({sold:true})
        }
    }) 
    })

    router.post("/editproduct", upload, function(req,res){
      products.updateOne({_id:req.body._id} ,{$set:{
          title:req.body.title,
          price : req.body.price,
          category : req.body.category,
          location : req.body.location,
          image : req.body.image
      }}, function(err,result){
          if (err) throw err;
          else{
              console.log("Updated");
          }
      }) 
  })

  router.get("/deleteproduct/:id",function(req,res){
    products.updateOne({_id:req.params.id} ,{$set: {status:"deleted"}}, function(err,result){
      if (err) throw err;
      else{
        res.send({deleted:true})
      }
  }) 
  })