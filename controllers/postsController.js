const express = require("express");
const router = express.Router();

const {PostsModel} = require("../models/postModel");
const urlencodedParser = express.urlencoded({extended: false});

//create user

router.post("/users", urlencodedParser, (req,res)=>{
    console.log(req.body.username);
    PostsModel.create({name:req.body.username});
})

//post exercices

router.post("/users/:id/exercises", urlencodedParser, (req, res)=>{
    console.log(req.params.id);
    const exerciceDate = req.body.date.length===0?Date.now():req.body.date;
        const newExercise = {
            exercise:req.body.description,
            date: exerciceDate,
            duration: req.body.duration
        }
    PostsModel.findById({_id:req.params.id}, (err, data)=>{
        if(err) return err;
        else{
        data.log.push(newExercise);
        data.save();  
        }
        
    })
    res.json(newExercise);
})

module.exports = router;