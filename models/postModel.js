const mongoose = require("mongoose");

const PostsModel = mongoose.model(
    "fccExercicesTracker",
    {
        name:{
            required:true,
            type:String
        },
        log:[
            {
            description:{
                    type:String
            },
            date:{
            required:true,
            type:Date,
            default: Date.now
        },
            duration:{
                type:String
            }
        }
        ]
    },
    "posts"
)

module.exports = {PostsModel}