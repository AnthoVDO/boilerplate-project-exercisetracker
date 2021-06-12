const express = require("express");
const router = express.Router();
const {PostsModel} = require("../models/postModel");

router.get("/users", (req, res)=>{
    let allUsers = [];
    PostsModel.find({}, (err, users)=>{
        if(err) return err;
        else{
            users.forEach(x=>{
            return allUsers.push({
                "username":x.name,
                "_id":x._id
            })
        })
        res.json(allUsers);
        }
    })
})

router.get("/users/:_id/logs", (req, res)=>{
    PostsModel.findById({_id:req.params._id}, (err, user)=>{
        if(err) return err;
        else{
            const userInfo = {
                "_id": user._id,
                "name":user.name,
                "count":user.log.length,
                "log":user.log
            }
            res.json(userInfo);
        }
    })
})

module.exports = router;