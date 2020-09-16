const express=require("express");
const router=express.Router();
const bodyParser = require('body-parser'); 
const mongodb=require("mongodb");
const mongoClient=mongodb.MongoClient;

//const url="mongodb+srv://Tnahsin79:tnahsin79@guvi-zen.iisub.mongodb.net?retryWrites=true&w=majority"; 
const url="mongodb+srv://Tnahsin79:tnahsin79@guvi-zen.iisub.mongodb.net?retryWrites=true&w=majority";

router.get("/",async function(req,res){
    try
    {
        let client=await mongoClient.connect(url);
        let db=client.db("student-mentor");
        let studentArray=db.collection("student").find().toArray(); 
        client.close();
        res.json(studentArray);
    }
    catch(error)
    {
        res.json({
            message:"Something went wrong"
        });
    }
});

router.post("/",async function(req,res){
    try
    {
        //let db=await mongoClient.connect(url);
        let client=await mongoClient.connect(url);
        let db=client.db("student-mentor");
        let insertedStudent=await db.collection("student").insertOne({
            name:req.body.name
        });
        client.close();
        res.json({
            message:"Student created"
        });
    }
    catch(error)
    {
        res.json({
            message:"Something went wrong"
        });
    }
});

module.exports = router;