import mongoose from 'mongoose';
import Questions from '../models/Questions.js'

export const postAnswer= async(req,res)=>{
    const {id:_id}=req.params;
    const {noOfAnswers,answerBody,userAnswered,userId}=req.body;
    if(!mongoose.Types.ObjectId.isValid(_id)){
        res.status(404).json('question unavailable...')
        res.end()
    }
    updateNoOfQuestions(_id,noOfAnswers)
    try{
        const updatedQuestion = await Questions.findByIdAndUpdate(_id,{$addToSet:{'answer':[{answerBody,userAnswered,userId}]}})
        res.status(200).json(updatedQuestion)
        res.end()
    }
    catch(error){
        res.status(400).json(error)
        res.end()
    }
}

const updateNoOfQuestions= async(_id,noOfAnswers)=>{
    try{
        await Questions.findByIdAndUpdate(_id,{$set:{'noOfAnswers':noOfAnswers}})
    }
    catch(error)
    {
        console.log(error)
    }
}

export const deleteAnswer = async(req,res)=>{
    const {id:_id}=req.params;
    const {answerId,noOfAnswers}=req.body;
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).json('invalid answerId')
    }
    if(!mongoose.Types.ObjectId.isValid(answerId)){
        return res.status(404)
    }
    updateNoOfQuestions(_id,noOfAnswers)
    try{
        await Questions.updateOne(
            {_id},
            {$pull:{'answer':{id:answerId}}}
        )
        res.status(200).json('answer deleted successfully')
    }
    catch(error){
        res.status(404).json(error)
    }
}