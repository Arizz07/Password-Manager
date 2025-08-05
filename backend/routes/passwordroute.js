import express from "express"
import { Router } from "express"
const router = express.Router()
import Password from "../models/passwordSchema.js"

router.post('/add',async (req,res)=>{
    try{
    let inputs = req.body
    console.log(inputs)
    const newPassword = new Password({
        url:inputs.url,
        user:inputs.user,
        pass:inputs.pass
    })
  const saved =  await newPassword.save()
  if(saved){
    res.status(200).json({message:"Password Saved",data:saved})
  }
}catch(err){
    console.error(err)
    res.status(500).json({err:"something went wrong"})
}
})

router.get('/get',async (req,res)=>{
  try{
  const passwords = await Password.find()
  res.json(passwords)
  }catch(err){
    console.error(err)
    res.status(500).json({error:"server error"})
  }
})
router.put('/addbyid',async (req,res)=>{
  try{
    console.log(req.body.id)
    let updated = await Password.findByIdAndUpdate(req.body.id,req.body,{new:true})
    res.status(200).json({message:"edited successfull",data:updated})
    console.log("updated id ", updated)
  }catch(err){
    res.status(500).json({error:"error in updating"})
  }
  

})
router.delete('/delete',async(req,res)=>{
 console.log("deleting data reached",req.body)
 try{
  const deletedData = await Password.findByIdAndDelete(req.body.id)
  res.json(deletedData)
 }catch(err){
  res.status(500).json({error:"error while deleting"})
 }
})

export default router