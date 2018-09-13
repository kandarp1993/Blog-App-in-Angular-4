var express = require('express'),
    app = express(),
    cors = require('cors'),
    jwt = require('jsonwebtoken'),
    bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var usrCollection,postCollection,commentCollection,likePostCollection,db;

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());

//Receive data from angular
app.use(cors({
    origin:"http://localhost:4200"
}))

//connection with mongodb
MongoClient.connect("mongodb://localhost:27017/assessment", function(err, db) {
  if(err) { return console.dir(err); }
  db = db.db("assessment");
  usrCollection = db.collection('users', function(err, collection) {});
  postCollection = db.collection('posts', function(err, collection) {});
  commentCollection = db.collection('comments', function(err, collection) {});
  likePostCollection = db.collection('likes', function(err, collection) {});
  console.log("Coonected to database")
});

app.post('/signup',function(req,res){
    usrCollection.find({'uname':req.body.uname}).toArray(function(err,docs){
        if(docs.length<1){
            usrCollection.insert(req.body, function(err, res) {
                if (err) throw err;
                console.log("1 document inserted");
            });
            res.send(true);
        }else{
            res.send(false);
        }
    });
    
});
app.post('/login',function(req,res){
    
    usrCollection.find({uname:req.body.uname,psw:req.body.psw}).toArray(function(err, result) {
        if (err) throw err;
        if(!result.length <1){
            var token = jwt.sign({uname:req.body.uname},'secret-key',{ 'expiresIn':'5h'})
            res.send({
                token: token,
                isLoggedIn: true
            })
        }
        else{
            res.send(
                {
                    isLoggedIn: false,
                    err:'Invalid User.'
                }
            );
        }  
      });
});

app.use(function(req,res,next){
    var token = req.body.authtoken || req.query.authtoken || req.headers.authtoken;
    if(token){
        jwt.verify(token,'secret-key',function(err,decoded){
            if(!err){
                req.decoded = decoded;
                next();
            }else{
                res.send({
                    isLoggedIn:false,
                    err:'Invalid Request jwt'
                })
            }
        })
    }else{
        res.send({
            isLoggedIn:false,
            err:'Invalid Request'
        })
    }
});
var nooflikes = 0;
app.get('/allpost',function(req,res){
  
    postCollection.find({}).toArray(function(err, result) {
        if (!err){
            for(var j =0 ; j < result.length; j++){
                result[j].isVisible = false;
                result[j].isLike = false;
                for( let p =0; p < result[j].likename.length; p++){
                    if(req.decoded.uname == result[j].likename[p]){
                        result[j].isLike = true;
                    }
                }
                if(result[j].uname == req.decoded.uname){
                    result[j].isVisible = true;
                    
                }
            }
            res.send({
                data:result,
                success: true,
            })
        }else{
            res.send({
                success: false
            })
        }
      });
});

app.post('/getComments',function(req,res){

    commentCollection.find({postId:req.body.id}).toArray(function(err, result) {
        //console.log(result);
        if (!err){
            for(var j =0 ; j < result.length; j++){
                result[j].isCmtdelete = false;
                if(result[j].uname == req.decoded.uname){
                    result[j].isCmtdelete = true;
                }
            }
            res.send({
                data:result,
                success: true
            })
        }else{
            res.send({
                success: false
            })
        }
      });
});
app.post('/newpost',function(req,res){
    // var myobj = { uname: req.decoded.uname, data: req.body , likename:[]};
    req.body.uname = req.decoded.uname;
    req.body.likename = []
    postCollection.insertOne(req.body, function(err) {
        if (err) throw err;
        console.log("1 document inserted");
        res.send({
            msg:true
        })
    });

});
app.post('/addComment',function(req,res){
   // var myobj = { uname: req.decoded.uname, data: req.body };
   
    req.body.uname=req.decoded.uname;
//console.log('add post..'+JSON.stringify(req.body))

    commentCollection.insertOne(req.body, function(err, result) {
        if (!err){
            res.send({
                data:result,
                success:true
            })
        }else{
            res.send({
                success:false
            })
        }
    });
});
app.post('/deletepost',function(req,res){
    postCollection.deleteOne({"_id": new ObjectId(req.body.id)},function(err,result){
        if(!err){
            res.send({
                delete:true
            })
        }
        else{
            res.send({
                delete:false
            })
        }
    })
})
app.post('/deleteComment',function(req,res){
    commentCollection.deleteOne({"_id": new ObjectId(req.body.id)},function(err,result){
        if(!err){
            res.send({
                delete:true
            })
        }
        else{
            res.send({
                delete:false
            })
        }
    })
})
app.post('/likepost',function(req,res){
     req.body.uname=req.decoded.uname;
     
     postCollection.updateOne({"_id": new ObjectId(req.body.id)}, 
     { $push: { "likename": req.body.uname} },

     function(err,resp){
         if(!err){
            res.send({
                success:true,
            })
         }
     });
    
 });
 app.post('/getPostData',function(req,res){
   
    postCollection.find({"_id":new ObjectId(req.body.id)}).toArray(function(err, result) {
        if(!err){
            res.send({
                data:result,
                success:true
            })
        }
        else{
            res.send({
                success:false
            }) 
        }
    });
   
});
app.post('/updatePostData',function(req,res){
   //console.log("id........................"+JSON.stringify(req.body._id));
   //console.log("id........................"+JSON.stringify(req.body[0]._id));
   var newvalues = { $set: {title: req.body[0].title, description: req.body[0].description } };
    postCollection.updateOne({"_id": new ObjectId(req.body[0]._id)}, newvalues, function(err) {
      if(!err){
          res.send({
              success:true
          })
      }else{
        res.send({
            success:false
        })
      }
    })
   
});
 app.listen(3000,function(){
     console.log('Server running @ localhost:3000');
 })   