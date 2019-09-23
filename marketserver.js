var express = require('express');
const app = express();
const path = require('path');
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });

  var marketrouter = require("./routes/marketrouter")
  var userrouter = require("./routes/userrouter")

  var bodyparser = require('body-parser')
  app.use(bodyparser.urlencoded({extended:true}))
  app.use(bodyparser.json());

  app.use(express.static(path.join(__dirname+"/public"))); 

  app.use("/market",marketrouter);
  app.use("/user",userrouter)

  app.listen(process.env.PORT || 3000, () => console.log('Server Running on http://localhost:3000')); 
  