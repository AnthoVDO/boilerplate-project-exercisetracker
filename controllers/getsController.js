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

    PostsModel.estimatedDocumentCount((err, count)=>{
        if(err) console.log(err);
        else{

            let {from, to, limit} = req.query;
            from === undefined ? from = new Date(1970-01-01) : from;
            to === undefined ? to = Date.now() : to;
            limit === undefined ? limit = count : limit;

                PostsModel.findById({_id:req.params._id}, (err, user)=>{
                    if(err) return err;
                    else{

                        const logFiltered = [];

                        user.log.forEach(task=>{
                            task.find({date: {$gte: from, $lte: to}}).limit(limit).exec((err, dataFiltered)=>{
                            if (err) return err;
                            else{
                                logFiltered.push(dataFiltered)
                            }
                            }
                            
                            
                            )})


                            const userInfo = {
                            "_id": user._id,
                            "name":user.name,
                            "count":data.log.length,
                            "log":logFiltered
                            }
                        
                            res.json(userInfo);
                        
                    }
                })
        }
    })   
})

module.exports = router;