const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const config = require('./config/key');
const cookieParser = require('cookie-parser');
require("dotenv").config();

const port = process.env.PORT || 4000;
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use('/api/users', require('./routes/user'));

mongoose.connect(config.dbURI)
    .then(() => console.log("MongoDB connected!"))
    .catch((err) => console.log(err));


//배포
if (process.env.NODE_ENV === "production") {

    // Set static folder   
    // All the javascript and css files will be read and served from this folder
    app.use(express.static("client/build"));
  
    // index.html for all page routes    html or routing and naviagtion
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
    //   res.sendFile(path.join(__dirname, 'client/build/index.html'))
    });
}


app.listen(port, () => {
    console.log(`Example app listening on post ${port}`);
})