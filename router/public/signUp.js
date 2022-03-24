const express = require('express')
const router = express.Router()
const usersDbConenct = require('../../mongodb')
const mongodb = require('mongodb')

router.get('/',async (req,res)=>{
    let data=await usersDbConenct.usersDbConenct()
    data=await data.find().toArray();
    res.send(data)
    console.log(data)
  })
  router.post('/', async (req, res) => {
    let data = await usersDbConenct.usersDbConenct()
    let result = await data.insertOne(req.body)
  
  
    res.send(result)
  
  })
  router.put('/:name', async (req, res) => {
    let data = await usersDbConenct.usersDbConenct()
    let result = await data.updateOne(
      { name: req.params.name},
      { $set: req.body }
  
    )
    res.send({ result: "update" })
    console.log(result)
  
  })
  router.delete('/:id', async (req, res) => {
    console.log(req.params.id)
  
    let data=await usersDbConenct.usersDbConenct()
    const result=await data.deleteOne({_id:new mongodb.ObjectId(req.params.id)})
  
  
    res.send(result)
    // console.log()
  
  })

  module.exports = router;