'use strict'
const express = require("express");
let router = express.Router();
let mongoose = require('mongoose');

const mongoDb = 'mongodb+srv://makeUp:store_MakeUp@cluster0.xztv5.mongodb.net/makeUpStore?retryWrites=true&w=majority'
mongoose.createConnection(mongoDb, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
let db = mongoose.connection;
db.on('connected', function(){console.log("connected to db")});
db.on('error', function(){console.log("error")});
db.on('disconnected', function(){console.log("disconnected to db")});
let Schema = mongoose.Schema;
let product = new Schema(
    {
        id: { type: String, required: true },
        src: { type: String },
        productName: { type: String },
        category:{type:String},
        price: { type: Number },
    }
);
let products = mongoose.model('products', product,"products");

router.post("/insertProducts",(req,res) =>{
    products.insertMany([  {
        "id": "1",
        "src": "bbcream.jpg",
        "productName": "bbcream",
        "category": "skin",
        "price": 35
      },
      {
        "id": "2",
        "src": "consealer1.jpg",
        "productName": "consealer 01",
        "category": "skin",
        "price": 45
      },
      {
        "id": "3",
        "src": "consealer2.jpg",
        "productName": "consealer 02",
        "category": "skin",
        "price": 80
      },
      {
        "id": "4",
        "src": "consealer3.jpg",
        "productName": "consealer 03",
        "category": "skin",
        "price": 100
      },
      {
        "id": "5",
        "src": "cream.jpg",
        "productName": "cream",
        "category": "skin",
        "price": 30
      },
      {
        "id": "6",
        "src": "eyebrows.jpg",
        "productName": "eyebrows",
        "category": "eyes",
        "price": 74
      },
      {
        "id": "7",
        "src": "eyecream.jpg",
        "productName": "eyecream",
        "category": "eyes",
        "price": 69
      },
      {
        "id": "8",
        "src": "eyeliner.jpg",
        "productName": "eyeliner",
        "category": "eyes",
        "price": 54
      },
      {
        "id": "9",
        "src": "eyeshade.jpg",
        "productName": "eyeshade",
        "category": "eyes",
        "price": 24
      },
      {
        "id": "10",
        "src": "gloss.jpg",
        "productName": "gloss",
        "category": "lips",
        "price": 80
      },
      {
        "id": "11",
        "src": "jel.jpg",
        "productName": "jel",
        "category": "skin",
        "price": 100
      },
      {
        "id": "12",
        "src": "lipstick.jpg",
        "productName": "lipstick",
        "category": "lips",
        "price": 29
      },
      {
        "id": "13",
        "src": "makeup1.jpg",
        "productName": "makeup 01",
        "category": "skin",
        "price": 100
      },
      {
        "id": "14",
        "src": "makeup3.jpg",
        "productName": "makeup 03",
        "category": "skin",
        "price": 120
      },
      {
        "id": "15",
        "src": "makeup5.jpg",
        "productName": "makeup 05",
        "category": "skin",
        "price": 130
      },
      {
        "id": "16",
        "src": "mascara.jpg",
        "productName": "mascara",
        "category": "eyes",
        "price": 50
      },
      {
        "id": "17",
        "src": "mey-panim.jpg",
        "productName": "mey-panim",
        "category": "skin",
        "price": 25
      },
      {
        "id": "18",
        "src": "pencil.jpg",
        "productName": "pencil",
        "category": "eyes",
        "price": 36
      },
      {
        "id": "19",
        "src": "powder.jpg",
        "productName": "powder",
        "category": "skin",
        "price": 30
      },
      {
        "id": "20",
        "src": "sponge.jpg",
        "productName": "sponge",
        "category": "brushes",
        "price": 27
      }
    ])
    .then(function(){
        console.log("Data inserted");
        res.send("Data inserted")  // Success
    }).catch(function(error){
        console.log(error)      // Failure
    });

});
router.get('/all_items',async (req, res) => {
  await products.find({},(err,products)=>{
      if (err){
      return  res.status(422).send(err)
      }
      if (!products){
          return res.status(422).send({error:"No data in the collection"})
      }
      res.send(products)
  })
});
router.get('/',async (req, res) => {
  await products.find({"category":req.query.category},(err,products)=>{
      if (err){
      return  res.status(422).send(err)
      }
      if (!products){
          return res.status(422).send({error:"No data in the collection"})
      }
      res.send(products)
  })
});
router.get('/:',async (req, res) => {
    await products.find({"id":req.query.id},(err,product)=>{
        if (err){
        return  res.status(422).send(err)
        }
        if (!product){
            return res.status(422).send({error:"Item Not Found"})
        }
        res.send(product)
    })
  });
module.exports = router;

