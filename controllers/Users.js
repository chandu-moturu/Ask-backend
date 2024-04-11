import mongoose from "mongoose";
import users from '../models/auth.js'
import asyncHandler from 'express-async-handler'

export const getAllUsers = asyncHandler(async(req,res)=>{
  
    try{
        const allUsers=await users.find({});
        const allUserDetails = []
        allUsers.forEach(user=>{
            allUserDetails.push({_id:user._id,name:user.name,about:user.about,tags:user.tags,joinedOn:user.joinedOn})

        })
        res.status(200).json(allUserDetails);
        res.end()
  
    }
    catch(error){
        res.status(404).json({message:'cannot get users'})
        console.log("error in getallusers")
    }
})

export const updateProfile= asyncHandler(async(req,res)=>{
    const {id:_id}=req.params;
    const {name,about,tags}=req.body;
    if(!mongoose.Types.ObjectId.isValid(_id)){
        res.status(404).json({message:'user unavailable..'})
        
    }
    try{
        const updatedProfile =await users.findByIdAndUpdate(_id,{$set:{'name':name,'about':about,'tags':tags}},{new:true})
        res.status(200).json(updatedProfile)
        // res.send(updateProfile)
    
    }
    catch(error){
        console.log("error in update profile")
        res.status(405).json({message:'no user found'})
        res.end()
    }
})

export const allUsers = asyncHandler(async(req,res)=>{
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};
  const users = await users.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
  //
})