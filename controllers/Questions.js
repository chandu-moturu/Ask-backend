import mongoose from "mongoose";
import Questions from '../models/Questions.js'

export const AskQuestion=async (req,res)=>{
    const postQusetionData = req.body;
    const postQuestion = new Questions({...postQusetionData})
    try{
        await postQuestion.save();
        res.status(200).json("posted question successfully")
        res.end()
    }
    catch(err){
        res.status(404).json("couldn't post the question")
    }
}

export const getAllQuestions = async(req,res)=>{
    try{
        const questionList=await Questions.find();
        res.status(200).json(questionList)
        res.end()
    }
    catch(err){
        res.status(404).json({message:'some error in questions'})
        res.end()
    }
}   

export const deleteQuestion = async(req,res)=>{
    const {id:_id}=req.params;
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send("question unavailable...");
    }
    try{
        await Questions.findByIdAndRemove(_id);
        res.status(200).json({message:"Successfully deleted...."})
    }
    catch(error){
        res.status(404).json({message: error.message})

    }
}

export const voteQuestion=async(req,res)=>{
    const {id:_id}=req.params;
    const {value}=req.body;
    const userId = req.userId
    if(!mongoose.Types.ObjectId.isValid(_id)){
        res.status(404).json({message:'invalid id'})
        res.end()
    }
    try{
        const question=await Questions.findById(_id)
        const upIndex = question.upVote.findIndex((id)=>id==String(userId))
        const downIndex = question.downVote.findIndex((id)=>id==String(userId))

        if(value === 'upVote'){
            if(downIndex!==-1){
                question.downVote=question.downVote.filter((id)=>id!==String(userId))
            }
            if(upIndex===-1){
                question.upVote.push(userId)
            }
            else{
                question.upVote=question.upVote.filter((id)=>id!==String(userId))
            }
        }
        if(value==='downVote'){
            if(upIndex !==-1){
                question.upVote=question.upVote.filter((id)=>id!==String(userId))
            }
            if(downIndex===-1){
                question.downVote.push(userId)
            }
            else{
                question.downVote=question.downVote.filter((id)=>id!==String(userId))
            }
        }
        await Questions.findByIdAndUpdate(_id,question)
        res.status(200).json({message: 'voted successfully'})
        res.end()
    }
    catch(err){
        res.status(404).json({message:'invalid id'})
        res.end()
    }
}