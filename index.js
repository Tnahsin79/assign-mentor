//02:04:02
const express = require('express');
const app=express();
const bodyParser=require("body-parser");
const mongodb=require("mongodb");
const mongoClient=mongodb.MongoClient;
const cors=require("cors");
//const url="mongodb://localhost:27017";
const url="mongodb+srv://Tnahsin79:tnahsin79@guvi-zen.iisub.mongodb.net?retryWrites=true&w=majority";
app.use(bodyParser.json());
app.use(cors({
    origin:"https://mentor-and-student.netlify.app"
}));
//origin:"https://mentor-and-student.netlify.app"
//origin:"http://127.0.0.1:5500"

//student data
app.get("/students",async function(req,res){
  try
  {
      let client=await mongoClient.connect(url);
      let db=client.db("student-mentor");
      let studentArray=await db.collection("student").find().toArray(); 
      client.close();
      res.json(studentArray);
  }
  catch(error)
  {
      console.log(error);
      res.json({
        message:error
      });
  }
});
app.post("/student",async function(req,res){
  try
  {
      let client=await mongoClient.connect(url);
      let db=client.db("student-mentor");
      let insertedStudent=await db.collection("student").insertOne({
          name:req.body.name
      });
      console.log(insertedStudent.insertedId);
      client.close();
      res.json({
          message:"Student created",
          id:insertedStudent.insertedId
      });
  }
  catch(error)
  {
      res.json({
        message:error
      });
  }
});

//mentor data
app.get("/mentors",async function(req,res){
  try
  {
      let client=await mongoClient.connect(url);
      let db=client.db("student-mentor");
      let studentArray=await db.collection("mentor").find().toArray(); 
      client.close();
      res.json(studentArray);
  }
  catch(error)
  {
      res.json({
        message:error
      });
  }
});
app.post("/mentor",async function(req,res){
  try
  {
      let client=await mongoClient.connect(url);
      let db=client.db("student-mentor");
      let insertedStudent=await db.collection("mentor").insertOne({
          name:req.body.name
      });
      console.log(insertedStudent.insertedId);
      client.close();
      res.json({
          message:"mentor created",
          id:insertedStudent.insertedId
      });
  }
  catch(error)
  {
      res.json({
          message:error
      });
  }
});

//assign-mentor
app.put("/assign",async function(req,res){
  try
  {
      let sid=req.body.sid;
      let mid=req.body.mid;
      let client=await mongoClient.connect(url);
      let db=client.db("student-mentor");

      let student=await db.collection("student")
      .findOne({_id:mongodb.ObjectID(sid)});

      let mentor=await db.collection("mentor")
      .findOne({_id:mongodb.ObjectID(mid)});

      await db.collection("student")
      .findOneAndUpdate(
        {_id:mongodb.ObjectID(sid)},
        {$set:{mentor:{id:mid,name:mentor.name}}}
      );

      await db.collection("mentor")
      .findOneAndUpdate(
        {_id:mongodb.ObjectID(mid)},
        {$push:{students:{id:sid,name:student.name}}}
      );

      client.close();
      res.json({
          message:"Database updated"
      });
  }
  catch(error)
  {
      res.json({
        message:error
      });
  }
});
const port=process.env.PORT||3000;
app.listen(port);