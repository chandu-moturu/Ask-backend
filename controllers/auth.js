import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import users from '../models/auth.js'
import asyncHandler from 'express-async-handler'

export const signup = asyncHandler(async(req,res)=>{
    const {name,email,phone,password,pic}=req.body;
    try{
        const existinguser=await users.findOne({email});
        if(existinguser){
            alert("user already exists...")
            return res.status(404).json({message:'Email already exists...'})

        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
        const newUser = await users.create({name,email,phone,password:hashedPassword,pic})
        const token= jwt.sign({email:newUser.email,id:newUser._id},process.env.JWT_SECRET,{expiresIn:'1hr'});
        res.status(200).json({result:newUser,token})
        res.end()
    }
    catch(error){
        res.status(500)
    }
})

export const login = asyncHandler(async(req,res)=>{
    const {email,password}=req.body;
    try{
        const existinguser = await users.findOne({email});
        if(!existinguser){
            res.status(404).json('user is not exists')
            res.end()
        }
        const isPasswordCrt = await bcrypt.compare(password,existinguser.password)
        if(!isPasswordCrt){
            res.status(400).json({message:'Invalid credentials'})
            res.end()
        }
        
        const token=jwt.sign({email:existinguser.email,id:existinguser._id},process.env.JWT_SECRET,{expiresIn:'1hr'});
        res.status(200).json({result:existinguser,token})
        res.end()
    }
    catch(err){
        res.status(500)
    }
})