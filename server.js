const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
require("./models/dbConfig");
const postsController = require("./controllers/postsController");
const getsController = require("./controllers/getsController");


app.use(cors());
app.use(express.static('public'));
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.use("/api", postsController);
app.use("/api", getsController);




const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
})
