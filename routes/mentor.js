const express=require("express");
const router=express.Router();
const bodyParser = require('body-parser'); 
const mongodb=require("mongodb");
const mongoClient=mongodb.MongoClient;

const url="mongodb+srv://Tnahsin79:tnahsin79@guvi-zen.iisub.mongodb.net/student-mentor?retryWrites=true&w=majority";

router.get("/",async function(req,res){
    try
    {
        let client=await mongoClient.connect(url);
        let db=client.db("student-mentor");
        let mentorArray=db.collection("mentor").find().toArray(); 
        client.close();
        res.json(mentorArray);
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
        let client=await mongoClient.connect(url);
        let db=client.db("student-mentor");
        await db.collection("mentor").insertOne({
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