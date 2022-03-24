const express = require('express')
const autentication = require("../../middleware/autentication")
const router = express.Router()
const dbconnect = require('../../mongodb')
const mongodb = require('mongodb')

router.get('/', [autentication.verifyUser],async (req,res)=>{
    let data=await dbconnect.dbconnect()
    data=await data.find().toArray();
    res.send(data)
    console.log(data)
  })
  router.post('/', [autentication.verifyUser], async (req, res) => {
    let data = await  dbconnect.dbconnect()
    let result = await data.insertOne(req.body)
  
  
    res.send(result)
  
  })
  router.put('/:title',[autentication.verifyUser], async (req, res) => {
    let data = await dbconnect.dbconnect()
    let result = await data.updateOne(
      { name: req.params.name},
      { $set: req.body }
  
    )
    res.send({ result: "update" })
    console.log(result)
  
  })
  router.delete('/:id',[autentication.verifyUser], async (req, res) => {
    console.log(req.params.id)
  
    let data=await dbconnect.dbconnect()
    const result=await data.deleteOne({_id:new mongodb.ObjectId(req.params.id)})
  
  
    res.send(result)
    // console.log()
  
  })

  module.exports = router;