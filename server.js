var express = require("express");
var app = express();
var port = process.env.PORT || 8080;
var multer  = require('multer');
var upload = multer({ dest: 'uploads/', limits:{ fileSize:2000000 } });
var bodyParser = require('body-parser');
var fs = require("fs");

app.use(bodyParser.json());


app.listen(port,(err)=>{
   if(err){ throw err; }
   console.log("Server running on port "+port);
});

app.post('/submit', upload.single("fileInput"), function (req, res, next) {
  const out = {size:req.file.size};
  const loc = req.file.path;
  fs.unlink(loc,(err)=>{
     if(err){ throw err; } 
     console.log(loc+" - removed");
  });
  res.send(out);
});

app.get("/css/index.css",(req,res)=>{
   res.sendFile("index.css",{root: __dirname+"/css/" });
});

app.get("/",(req,res)=>{
   res.sendFile("index.html",{root: __dirname+"/html/" });
});