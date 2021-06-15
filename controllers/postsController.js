const express = require("express");
const router = express.Router();

const {PostsModel} = require("../models/postModel");
const urlencodedParser = express.urlencoded({extended: false});

//create user

router.post("/users", urlencodedParser, (req,res)=>{
    
    PostsModel.find({name:req.body.username}, async (err, userFound)=>{
        if(err) console.log(err);
        else{
            if(userFound.length === 0) {
                await PostsModel.create({name:req.body.username});
                await PostsModel.find({name:req.body.username}, (err, user)=>{
                    if(err) console.log(err)
                    else{
                        const newUser = {
                        "username": user[0].name,
                        "_id": user[0]._id
                        }
                        res.json(newUser)
                    }
                })
            }else{
                const newUser = {
                    "error": "this user already exist"
                    }
                    res.json(newUser)
            }
        }
    })


    



})

//post exercices

router.post("/users/:_id/exercises", urlencodedParser, async (req, res)=>{
    let inputdate = Date.parse(req.body.date);
    let exerciceDate;
    isNaN(inputdate) ? exerciceDate = new Date(): exerciceDate = new Date(req.body.date);
    exerciceDate = exerciceDate.toDateString();
        const newExercise = {
            date: exerciceDate,
            duration: parseInt(req.body.duration, 10),
            description:req.body.description,  
        }
    await PostsModel.findById({_id:req.params._id}, (err, data)=>{
        if(err) return err;
        else{
        data.log.push(newExercise);
        data.save();  
        const userWithExercice = {
        "_id" : req.params._id,
        "username" : data.name,
        "date": exerciceDate,
        "duration": parseInt(req.body.duration, 10),
        "description":req.body.description,
        }
        res.json(userWithExercice);
        }
    })
})

module.exports = router;