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
        if (err) console.log(err);
        else{
            let logFiltered = [];
            let {from, to, limit} = req.query;
            from === undefined ? from = new Date(1970-01-01) : from = new Date(from);
            to === undefined ? to = new Date() : to = new Date(to);
            limit === undefined ? limit = user.log.length : limit;

            
            for(let i = 0; i<limit ; i++){
                if(user.log[i].date>=from && user.log[i].date<=to){
                    logFiltered.push(user.log[i])
                }
            }
            

            const userInfo = {
            "_id": user._id,
            "name":user.name,
            "count":user.log.length,
            "log":logFiltered
            }
                                
            res.json(userInfo);
        }
    })

   
    
})



module.exports = router;