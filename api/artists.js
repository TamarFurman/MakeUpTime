'use strict'
const express = require("express");
let router = express.Router();
let mongoose = require('mongoose');

const mongoDb = 'mongodb+srv://makeUp:store_MakeUp@cluster0.xztv5.mongodb.net/makeUpStore?retryWrites=true&w=majority'

mongoose.createConnection(mongoDb, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true ,useFindAndModify:false});
let db = mongoose.connection;
db.on('connected', function(){console.log("connected to db")});
db.on('error', function(){console.log("error")});
db.on('disconnected', function(){console.log("disconnected to db")});
let Schema = mongoose.Schema;
let artist = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String },
        id: { type: String },
        phoneNumber:{type:String},
        seniority: { type: Number },
        src: { type: String },
        events: { type: Object }
    }
);
let artists = mongoose.model('artists', artist,"artists");

router.post("/insertArtists",(req,res) =>{
  artists.insertMany([
        {
          "name": "Chava Choen",
          "email": "chavachoen@gmail.com",
          "id": "chavachoen@gmail.com",
          "phoneNumber": "0583219365",
          "seniority": 10,
          "src": "artist1.jpg",
          "events": {}
        },
        {
          "name": "Goldie Shalom",
          "email": "goldie@gmail.com",
          "id": "goldie@gmail.com",
          "phoneNumber": "0504199912",
          "seniority": 5,
          "src": "artist2.jpg",
          "events": {}
        },
        {
          "name": "Shoshana levi",
          "email": "shosh12@gmail.com",
          "id": "shosh12@gmail.com",
          "phoneNumber": "0543217862",
          "seniority": 3,
          "src": "artist3.jpg",
          "events": {}
        },
        {
          "name": "Ayala Klein",
          "email": "studioayala@gmail.com",
          "id": "studioayala@gmail.com",
          "phoneNumber": "0527691245",
          "seniority": 4,
          "src": "artist6.jpg",
          "events": {}
        },
        {
          "name": "Avigail Fight",
          "email": "avmakeup8@gmail.com",
          "id": "avmakeup8@gmail.com",
          "phoneNumber": "0556722134",
          "seniority": 8,
          "src": "artist5.jpg",
          "events": {}
        },
        {
          "name": "Rivka Tal",
          "email": "talrivka@gmail.com",
          "id": "talrivka@gmail.com",
          "phoneNumber": "0543781234",
          "seniority": 2,
          "src": "artist.jpg",
          "events": {}
        }
      ])
    .then(function(){
        console.log("Data inserted");
        res.send("Data inserted")  // Success
    }).catch(function(error){
        console.log(error)      // Failure
    });

});
router.get('/all',async (req, res) => {
  await artists.find({},(err,artists)=>{
      if (err){
      return  res.status(422).send(err)
      }
      if (!artists){
          return res.status(422).send({error:"No data in the collection"})
      }
      res.send(artists)
  })
});
router.get('/:',async (req, res) => {
    console.log("get")
    console.log(req.query)
  await artists.findOne({"id":req.query.id},(err,artist)=>{
      if (err){
      return  res.status(422).send(err)
      }
      res.send(artist)
  })
});
router.put('/update',async (req, res) => {
    console.log(req.body);
    await artists.findOneAndUpdate({"id":req.query.id},{"$set":{"events":req.body}},(err,artist)=>{
        if (err){
        return  res.status(422).send(err)
        }
        if (!artist){
            return res.status(422).send({error:"No data in the collection"})
        }
        res.send(artist)
    })
  });
  router.put('/',async (req, res) => {
    await artists.updateMany({},{$set: {events:{}}},(err,artist)=>{
        if (err){
        return  res.status(422).send(err)
        }
        if (!artist){
            return res.status(422).send({error:"No data in the collection"})
        }
        res.send(artist)
    })
  });
  router.put('/delate',async (req, res) => {
    await artists.updateMany({},{$unset: {events:{}}},(err,artist)=>{
        if (err){
        return  res.status(422).send(err)
        }
        if (!artist){
            return res.status(422).send({error:"No data in the collection"})
        }
        res.send(artist)
    })
  });
module.exports = router;

