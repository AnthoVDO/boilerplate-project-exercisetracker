const mongoose = require("mongoose");

mongoose.connect(
   `mongodb+srv://${process.env.DBUSER}:${process.env.DBPW}@cluster0.eaxiq.mongodb.net/${process.env.DBCLUSTER}?retryWrites=true&w=majority`,
   {useNewUrlParser: true, useUnifiedTopology:true},
   (err)=>{
       if(!err) console.log("Mongodb connected");
       else console.log("Connection error :" + err);
   }
)