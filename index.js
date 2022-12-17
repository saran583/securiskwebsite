var express = require('express');
var router = express.Router();
const request = require('request');
var bodyParser = require('body-parser')
const app = express()
const fs = require('firebase-admin');
const serviceAccount = require('./Serviceaccount.json');

fs.initializeApp({
 credential: fs.credential.cert(serviceAccount)
});

const db = fs.firestore(); 

const getAllSectors = async (req,res) =>{
  const usersDb = db.collection('Sectors');
  let resp = await usersDb.get()
  let response = []
  resp.forEach(
      (doc)=>{
          console.log(doc)
          response.push(doc)
      }
  )
  res.send(response)
  return ""  
}

const getAllProducts= async (req,res)=>{
const usersDb = db.collection('Products');
    let resp = await usersDb.get()
    let buf = []
    resp.forEach(
        (doc)=>{
            console.log(doc)
            buf.push(doc)
        }
    )
    res.send(buf)
}

const getProductsbySector = async (req,res)=>{
    const productsDb = db.collection('Products');
    let queryresp = await productsDb.where("SectorID", "==", req.params.SectorId).get();
    var buf = []
    queryresp.forEach((qres)=>{
        buf.push(qres.data());
    })
    res.send(buf);
}

const getAllAddresses = async (req,res) =>{
  const usersDb = db.collection('Address');
  let resp = await usersDb.get()
  let response = []
  resp.forEach(
      (doc)=>{
          console.log(doc)
          response.push(doc)
      }
  )
  res.send(response)
  return ""  
}


const getAddressbylocation = async (req,res)=>{
  const productsDb = db.collection('Address');
  let queryresp = await productsDb.where("location", "==", req.params.location).get();
  var buf = []
  queryresp.forEach((qres)=>{
      buf.push(qres.data());
  })
  res.send(buf);
}



app.get('/getAllSectors', function(req, res) {
  getAllSectors(req, res);
});

app.get('/getAllProducts', function(req, res) {
  getAllProducts(req, res);
});

app.get('/getProductsbySector/:SectorId',function (req,res){
  getProductsbySector(req,res)
})

app.get('/getAllAddress',(req,res)=>{
  getAllAddresses(req,res)
})

app.get('/getAddressbylocation/:location',(req,res)=>{
  getAddressbylocation(req,res);
})

var server = app.listen("8080",()=>{
  console.log("App is runing in 8080")
})