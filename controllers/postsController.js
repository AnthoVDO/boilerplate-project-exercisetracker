const express = require("express");
const router = express.Router();

const {PostsModel} = require("../models/postModel");
const urlencodedParser = express.urlencoded({extended: false});

//create user

router.post("/users", urlencodedParser, async (req,res)=>{
    await PostsModel.create({name:req.body.username});
    await PostsModel.find({name:req.body.username}, (err, user)=>{
        if(err) console.log(err)
        const newUser = {
            "username": user[0].name,
            "_id": user[0]._id
        }
        res.json(newUser)
    })
})

//post exercices

router.post("/users/:id/exercises", urlencodedParser, async (req, res)=>{
    const exerciceDate = req.body.date.length===0? new Date():req.body.date;
        const newExercise = {
            date: exerciceDate,
            duration: req.body.duration,
            description:req.body.description,  
        }
    await PostsModel.findById({_id:req.params.id}, (err, data)=>{
        if(err) return err;
        else{
        data.log.push(newExercise);
        data.save();  
        const userWithExercice = {
        "_id" : req.params.id,
        "username" : data.name,
        "date": exerciceDate,
        "duration": req.body.duration,
        "description":req.body.description,
        }
        res.json(userWithExercice);
        }
    })
})

module.exports = router;