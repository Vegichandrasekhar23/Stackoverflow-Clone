var express = require('express');
const req = require('express/lib/request');
var router = express.Router();
var mongoose = require('mongoose');
const {mongodb,MongoClient, dbURL} = require('../dbConfig');
const {User} = require('../Schema');

mongoose.connect(dbURL);


router.get('/',async(req,res)=>{
  const user = await User.find();
  res.send(user);
})

module.exports = router;
